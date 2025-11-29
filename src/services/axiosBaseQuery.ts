import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import events, { eventKeys } from '@utils/helpers/events';
import { StaffWiseAppAPIError } from '@utils/types/error.class';
import type { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const TIMEOUT = 60000; // 60s

const getToken = async () => {
  return '';
};

const resetToken = () => {
  events.emit(eventKeys.resetToken);
  axios.defaults.headers.common.Authorization = '';
};

const invalidUrls = [
  '/account/login',
  '/account/request-otp-register',
  '/account/change-pass',
];

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
            text1: 'Hệ thống không phản hồi. Vui lòng thử lại sau.',
          });
          sendError();
          break;
        }
        case (err?.response?.data as any)?.statusCode ===
          'auth.token-invalid': {
          resetToken();
          break;
        }
        case (err?.response?.data as any)?.statusCode === 'auth.user_locked': {
          Toast.show({
            type: 'error',
            text1:
              'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên.',
          });
          resetToken();
          break;
        }
        case (err?.response?.data as any)?.statusCode ===
          'auth.api_version_invalid': {
          resetToken();
          events.emit(eventKeys.checkAPIVersion);
          break;
        }
        case (err?.response?.data as any)?.statusCode ===
          'auth.user_not_found': {
          resetToken();
          break;
        }
        case err.isAxiosError &&
          err.code === 'ERR_BAD_REQUEST' &&
          !invalidUrls.includes(endpoint): {
          Toast.show({
            type: 'error',
            text1: 'Thông tin không chính xác. Vui lòng kiểm tra lại.',
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
