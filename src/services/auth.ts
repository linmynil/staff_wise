import { baseAPI, Method } from './baseAPI';

export const authServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    login: buider.mutation({
      query: data => ({
        endpoint: '/auth/login',
        method: Method.POST,
        data: data,
      }),
    }),
    changePassword: buider.mutation({
      query: data => ({
        endpoint: '/auth/change-password',
        method: Method.PATCH,
        data: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authServive;
