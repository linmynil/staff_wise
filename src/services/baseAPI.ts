import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './axiosBaseQuery';

export enum tagTypes {
  Account = 'Account',
  Employee = 'Employee',
  Auth = 'Auth',
  Leave = 'Leave',
  Chat = 'Chat',
  Notifications = 'Notifications',
  Monitoring = 'Monitoring',
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
