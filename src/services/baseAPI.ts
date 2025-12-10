import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './axiosBaseQuery';

export enum tagTypes {
  Account = 'Account',
  Auth = 'Auth',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const baseAPI = createApi({
  reducerPath: 'apiCaching',
  baseQuery: baseQuery,
  tagTypes: Object.values(tagTypes),
  endpoints: () => ({}),
});
