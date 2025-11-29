import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './axiosBaseQuery';

export enum tagTypes {
  Profile = 'Profile',
  Order = 'Order',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const baseAPI = createApi({
  reducerPath: 'apiCaching',
  baseQuery: baseQuery,
  tagTypes: Object.values(tagTypes),
  endpoints: () => ({}),
});
