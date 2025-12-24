import {
  Account,
  CreateAccountWithEmployeeBody,
  GetAccountRequest,
  GetAccountResponse,
  UpdateAccountBody,
} from '@utils/types/account.type';
import { baseAPI, Method, tagTypes } from './baseAPI';

export const accountServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getAccountInfo: buider.query<Account, number>({
      query: id => ({
        endpoint: `/accounts/${id}`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Account],
    }),
    getAccounts: buider.query<GetAccountResponse, GetAccountRequest>({
      query: query => ({
        endpoint: `/accounts`,
        method: Method.GET,
        params: query,
      }),
      providesTags: [tagTypes.Account],
    }),
    createAccountWithEmployee: buider.mutation<Account, CreateAccountWithEmployeeBody>({
      query: data => ({
        endpoint: '/accounts/with-employee',
        method: Method.POST,
        data: data,
      }),
    }),
    updateAccount: buider.mutation<Account, UpdateAccountBody>({
      query: data => ({
        endpoint: `/accounts/${data.id}`,
        method: Method.PATCH,
        data: data.body,
      }),
    }),
  }),
});

export const {
  useGetAccountInfoQuery,
  useGetAccountsQuery,
  useCreateAccountWithEmployeeMutation,
  useUpdateAccountMutation,
} = accountServive;
