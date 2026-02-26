import {
  CreateLeaveBalanceBody,
  Balance,
  GetLeaveSummaryResponse,
  CreateLeaveBalanceRefillBody,
  CreateLeaveBalanceRefillResponse,
  CreateLeaveBalanceBonusResponse,
  CreateLeaveBalanceBonusBody,
  CreateLeaveResponse,
  CreateLeaveRequest,
} from '@utils/types/leave.type';
import { baseAPI, Method, tagTypes } from './baseAPI';

export const leaveServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getLeaveSummaryDashboard: buider.query<GetLeaveSummaryResponse, {}>({
      query: () => ({
        endpoint: `/leave/summary`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Leave],
    }),
    getEmployeeLeaveBalance: buider.query<Balance, number>({
      query: id => ({
        endpoint: `/leave/balance/${id}`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Leave],
    }),
    getCurrentLeaveBalance: buider.query<Balance, {}>({
      query: () => ({
        endpoint: `/leave/balance`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Leave],
    }),
    createLeaveBalance: buider.mutation<Balance, CreateLeaveBalanceBody>({
      query: data => ({
        endpoint: '/leave/balance',
        method: Method.POST,
        data: data,
      }),
    }),
    createLeaveBalanceRefill: buider.mutation<
      CreateLeaveBalanceRefillResponse,
      CreateLeaveBalanceRefillBody
    >({
      query: data => ({
        endpoint: '/leave/balance/refill',
        method: Method.POST,
        data: data,
      }),
    }),
    createLeaveBalanceBonus: buider.mutation<
      CreateLeaveBalanceBonusResponse,
      CreateLeaveBalanceBonusBody
    >({
      query: data => ({
        endpoint: '/leave/balance/bonus',
        method: Method.POST,
        data: data,
      }),
    }),
    CreateLeaveRequest: buider.mutation<CreateLeaveResponse, CreateLeaveRequest>({
      query: data => ({
        endpoint: '/leave/requests',
        method: Method.POST,
        data: data,
      }),
    }),
  }),
});

export const {
  useGetLeaveSummaryDashboardQuery,
  useGetCurrentLeaveBalanceQuery,
  useGetEmployeeLeaveBalanceQuery,
  useCreateLeaveBalanceMutation,
  useCreateLeaveBalanceRefillMutation,
  useCreateLeaveBalanceBonusMutation,
  useCreateLeaveRequestMutation,
} = leaveServive;
