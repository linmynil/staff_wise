import {
  ChangePasswordBody,
  ChangePasswordResponse,
  LoginBody,
  LoginResponse,
} from '@utils/types/auth.type';
import { baseAPI, Method } from './baseAPI';

export const authServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    login: buider.mutation<LoginResponse, LoginBody>({
      query: data => ({
        endpoint: '/auth/login',
        method: Method.POST,
        data: data,
      }),
    }),
    changePassword: buider.mutation<ChangePasswordResponse, ChangePasswordBody>(
      {
        query: data => ({
          endpoint: '/auth/change-password',
          method: Method.PATCH,
          data: data,
        }),
      },
    ),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authServive;
