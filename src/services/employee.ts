import { baseAPI, Method, tagTypes } from './baseAPI';
import {
  Employee,
  GetEmployeeWithPaginationRequest,
  GetEmployeeWithPaginationResponse,
  UpdateEmployeeBody,
} from '@utils/types/employee.type';

export const employeeServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getEmployeeInfo: buider.query<Employee, {}>({
      query: () => ({
        endpoint: `/employees/me`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Employee],
    }),
    getEmployeesWithPagination: buider.query<
      GetEmployeeWithPaginationResponse,
      GetEmployeeWithPaginationRequest
    >({
      query: query => ({
        endpoint: `/employees`,
        method: Method.GET,
        params: query,
      }),
      providesTags: [tagTypes.Employee],
    }),
    getEmployeesNoPagination: buider.query<Employee[], {}>({
      query: () => ({
        endpoint: `/employees/list`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Employee],
    }),
    getEmployeeDetail: buider.query<Employee, number>({
      query: id => ({
        endpoint: `/employees/${id}`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Employee],
    }),
    updateEmployee: buider.mutation<Employee, UpdateEmployeeBody>({
      query: data => ({
        endpoint: `/employees/${data.id}`,
        method: Method.PATCH,
        data: data.body,
      }),
    }),
  }),
});

export const {
  useGetEmployeeInfoQuery,
  useGetEmployeesWithPaginationQuery,
  useGetEmployeesNoPaginationQuery,
  useGetEmployeeDetailQuery,
  useUpdateEmployeeMutation,
} = employeeServive;
