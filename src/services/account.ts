import { Account } from '@utils/types/account.type';
import { baseAPI, Method } from './baseAPI';

export const accountServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getAccountInfo: buider.query<Account, number>({
      query: id => ({
        endpoint: `/accounts/${id}`,
        method: Method.GET,
      }),
    }),
  }),
});

export const { useGetAccountInfoQuery } = accountServive;
