import {
  GetMonitoringEventsRequest,
  GetMonitoringEventsResponse,
  MonitoringMetadataResponse,
  MonitoringSummaryResponse,
  GetMonitoringCameraSourcesResponse,
  MonitoringPlaybackResponse,
} from '@utils/types/monitoring.type';

import { baseAPI, Method, tagTypes } from './baseAPI';

export const monitoringService = baseAPI.injectEndpoints({
  endpoints: builder => ({
    /**
     * GET /monitoring/events
     */
    getMonitoringEvents: builder.query<GetMonitoringEventsResponse, GetMonitoringEventsRequest>({
      query: query => ({
        endpoint: '/monitoring/events',
        method: Method.GET,
        params: query,
      }),

      providesTags: [tagTypes.Monitoring],
    }),

    /**
     * GET /monitoring/metadata
     */
    getMonitoringMetadata: builder.query<MonitoringMetadataResponse, {}>({
      query: () => ({
        endpoint: '/monitoring/metadata',
        method: Method.GET,
      }),

      providesTags: [tagTypes.Monitoring],
    }),

    /**
     * GET /monitoring/reports/summary
     */
    getMonitoringSummary: builder.query<MonitoringSummaryResponse, {}>({
      query: () => ({
        endpoint: '/monitoring/reports/summary',
        method: Method.GET,
      }),

      providesTags: [tagTypes.Monitoring],
    }),

    /**
     * GET /monitoring/camera-sources
     */
    getMonitoringCameraSources: builder.query<GetMonitoringCameraSourcesResponse, {}>({
      query: () => ({
        endpoint: '/monitoring/camera-sources',
        method: Method.GET,
      }),

      providesTags: [tagTypes.Monitoring],
    }),

    /**
     * GET /monitoring/camera-sources/{cameraSourceKey}/playback
     */
    getMonitoringCameraPlayback: builder.query<MonitoringPlaybackResponse, string>({
      query: cameraSourceKey => ({
        endpoint: `/monitoring/camera-sources/${encodeURIComponent(cameraSourceKey)}/playback`,
        method: Method.GET,
      }),

      providesTags: [tagTypes.Monitoring],
    }),
  }),
});

export const {
  useGetMonitoringEventsQuery,
  useLazyGetMonitoringEventsQuery,

  useGetMonitoringMetadataQuery,
  useLazyGetMonitoringMetadataQuery,

  useGetMonitoringSummaryQuery,

  useGetMonitoringCameraSourcesQuery,

  useGetMonitoringCameraPlaybackQuery,
  useLazyGetMonitoringCameraPlaybackQuery,
} = monitoringService;
