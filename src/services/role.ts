import { GetRoleQuery, GetRoleResponse } from '@utils/types/role.type';
import { baseAPI, Method } from './baseAPI';

export const roleServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getRoles: buider.query<GetRoleResponse, GetRoleQuery>({
      query: data => ({
        endpoint: `/roles`,
        method: Method.GET,
        params: data,
      }),
    }),
  }),
});

export const { useGetRolesQuery } = roleServive;
