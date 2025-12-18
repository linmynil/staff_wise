import { baseAPI, Method } from './baseAPI';
import {
  Employee,
  GetEmployeeWithPaginationRequest,
  GetEmployeeWithPaginationResponse,
} from '@utils/types/employee.type';

export const employeeServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getEmployeeInfo: buider.query<Employee, {}>({
      query: () => ({
        endpoint: `/employees/me`,
        method: Method.GET,
      }),
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
    }),
    getEmployeesNoPagination: buider.query<Employee[], {}>({
      query: () => ({
        endpoint: `/employees/list`,
        method: Method.GET,
      }),
    }),
  }),
});

export const {
  useGetEmployeeInfoQuery,
  useGetEmployeesWithPaginationQuery,
  useGetEmployeesNoPaginationQuery,
} = employeeServive;
