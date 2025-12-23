import {
  Account,
  CreateAccountWithEmployeeBody,
  GetAccountRequest,
  GetAccountResponse,
} from '@utils/types/account.type';
import { baseAPI, Method } from './baseAPI';

export const accountServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getAccountInfo: buider.query<Account, number>({
      query: id => ({
        endpoint: `/accounts/${id}`,
        method: Method.GET,
      }),
    }),
    getAccounts: buider.query<GetAccountResponse, GetAccountRequest>({
      query: query => ({
        endpoint: `/accounts`,
        method: Method.GET,
        params: query,
      }),
    }),
    createAccountWithEmployee: buider.mutation<Account, CreateAccountWithEmployeeBody>({
      query: data => ({
        endpoint: '/accounts/with-employee',
        method: Method.POST,
        data: data,
      }),
    }),
  }),
});

export const { useGetAccountInfoQuery, useGetAccountsQuery, useCreateAccountWithEmployeeMutation } =
  accountServive;
