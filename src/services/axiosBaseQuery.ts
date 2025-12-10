import { getString, removeKey } from '@config/mmkv';
import { TokenType } from '@redux/reducers/auth.slice';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import events, { eventKeys } from '@utils/helpers/events';
import { StaffWiseAppAPIError } from '@utils/types/error.class';
import type { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const TIMEOUT = 60000; // 60s

const getToken = () => {
  try {
    const token = getString(TokenType.ACCESS_TOKEN);
    return token || '';
  } catch (error) {
    console.log('Get token error:', error);
    return '';
  }
};

const resetToken = async () => {
  removeKey(TokenType.ACCESS_TOKEN);
  events.emit(eventKeys.resetToken);
  axios.defaults.headers.common.Authorization = '';
};

const invalidUrls = ['/auth/login', '/auth/change-password'];

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      endpoint: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
      responseType?: AxiosRequestConfig['responseType'];
    },
    unknown,
    unknown
  > =>
  async ({ endpoint, method, data, params, headers = {}, responseType }) => {
    if (!axios.defaults.headers.common.Authorization) {
      const token = await getToken();
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    }
    const customHeaders = {
      ...axios.defaults.headers.common,
      accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-version': axios.defaults.headers.common['x-api-version'],
      ...headers,
    } as unknown as AxiosHeaders;

    const url = axios.defaults.baseURL + endpoint;
    console.info('URL:', method, ': ', url);
    console.info('BODY:', JSON.stringify(data, null, 2));
    console.info('PARAM:', JSON.stringify(params, null, 2));

    try {
      const result = await axios({
        url: url,
        method: method || 'GET',
        data,
        params,
        headers: customHeaders,
        responseType,
        timeout: TIMEOUT,
      });

      console.info(
        'DATA of',
        url,
        '_____',
        JSON.stringify(result?.data, null, 2),
      );
      return { data: result?.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.error(
        'ERROR:',
        err.code,
        err.name,
        err.cause,
        err.isAxiosError,
        err.message,
        err.status,
        err?.response?.data,
      );
      console.error('ERROR:', err?.response?.data);

      const sendError = () =>
        console.log(
          new StaffWiseAppAPIError(
            'Error:' +
              JSON.stringify(err?.response?.data) +
              '.\n' +
              'Occurs when calling: ' +
              url +
              ' \n.' +
              ' with body:' +
              JSON.stringify(data),
          ),
        );

      switch (true) {
        case err.isAxiosError &&
          ['ERR_BAD_RESPONSE', 'ECONNABORTED'].includes(err.code || ''): {
          Toast.show({
            type: 'error',
            text1: 'The system is not responding. Please try again later!',
          });
          sendError();
          break;
        }
        case (err?.response?.data as any)?.errorCode === 'UNAUTHORIZED': {
          Toast.show({
            type: 'error',
            text1: 'Your login session has expired. Please log in again!',
          });
          resetToken();
          break;
        }
        case err.isAxiosError &&
          err.code === 'ERR_BAD_REQUEST' &&
          !invalidUrls.includes(endpoint): {
          Toast.show({
            type: 'error',
            text1: 'The information is incorrect. Please double-check!',
          });
          sendError();
          break;
        }
        default: {
          sendError();
          break;
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const baseQuery = axiosBaseQuery();

export default baseQuery;
