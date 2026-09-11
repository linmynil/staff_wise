import { baseAPI, Method, tagTypes } from './baseAPI';

import {
  GetNotificationsParams,
  GetNotificationsResponse,
  LogoutFCMTokenBody,
  LogoutFCMTokenResponse,
  MarkNotificationReadResponse,
  RegisterFCMTokenBody,
  RegisterFCMTokenResponse,
} from '@utils/types/notification.type';

export const notificationService = baseAPI.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsParams>({
      query: ({ page, limit }) => ({
        endpoint: '/notifications',
        method: Method.GET,
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.Notifications],
    }),
    markNotificationAsRead: builder.mutation<MarkNotificationReadResponse, number>({
      query: id => ({
        endpoint: `/notifications/${id}/read`,
        method: Method.PATCH,
      }),
      invalidatesTags: [tagTypes.Notifications],
    }),
    registerFCMToken: builder.mutation<RegisterFCMTokenResponse, RegisterFCMTokenBody>({
      query: data => ({
        endpoint: '/notifications/device-tokens/register',
        method: Method.POST,
        data,
      }),
    }),

    logoutFCMToken: builder.mutation<LogoutFCMTokenResponse, LogoutFCMTokenBody>({
      query: data => ({
        endpoint: 'notifications/device-tokens/unlink',
        method: Method.POST,
        data,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useRegisterFCMTokenMutation,
  useLogoutFCMTokenMutation,
} = notificationService;
