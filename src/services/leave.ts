import {
  CreateLeaveBalanceBody,
  Balance,
  GetLeaveSummaryResponse,
  CreateLeaveBalanceRefillBody,
  CreateLeaveBalanceRefillResponse,
  CreateLeaveBalanceBonusResponse,
  CreateLeaveBalanceBonusBody,
  CreateLeaveResponse,
  CreateLeaveRequests,
  GetLeaveRequest,
  GetLeaveResponse,
  Leave,
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
    getLeaves: buider.query<GetLeaveResponse, GetLeaveRequest>({
      query: query => ({
        endpoint: `/leave/requests`,
        method: Method.GET,
        params: query,
      }),
      providesTags: [tagTypes.Leave],
    }),
    getLeavesPendingApprovals: buider.query<GetLeaveResponse, GetLeaveRequest>({
      query: query => ({
        endpoint: `/leave/requests/pending-approvals`,
        method: Method.GET,
        params: query,
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
    createLeaveRequests: buider.mutation<CreateLeaveResponse, CreateLeaveRequests>({
      query: data => ({
        endpoint: '/leave/requests',
        method: Method.POST,
        data: data,
      }),
    }),
    getLeaveDetail: buider.query<Leave, number>({
      query: id => ({
        endpoint: `/leave/requests/${id}`,
        method: Method.GET,
      }),
    }),
    cancelPendingLeaveRequest: buider.query<Leave, number>({
      query: id => ({
        endpoint: `/leave/requests/${id}/cancel`,
        method: Method.POST,
      }),
    }),
  }),
});

export const {
  useGetLeaveSummaryDashboardQuery,
  useGetLeavesQuery,
  useGetLeavesPendingApprovalsQuery,
  useGetCurrentLeaveBalanceQuery,
  useGetEmployeeLeaveBalanceQuery,
  useCreateLeaveBalanceMutation,
  useCreateLeaveBalanceRefillMutation,
  useCreateLeaveBalanceBonusMutation,
  useCreateLeaveRequestsMutation,
  useGetLeaveDetailQuery,
  useLazyGetLeaveDetailQuery,
  useCancelPendingLeaveRequestQuery,
} = leaveServive;
