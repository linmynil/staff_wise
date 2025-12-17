import { baseAPI, Method } from './baseAPI';
import {
  Employee,
  GetEmployeeRequest,
  GetEmployeeResponse,
} from '@utils/types/employee.type';

export const employeeServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getEmployeeInfo: buider.query<Employee, {}>({
      query: () => ({
        endpoint: `/employees/me`,
        method: Method.GET,
      }),
    }),
    getEmployees: buider.query<GetEmployeeResponse, GetEmployeeRequest>({
      query: query => ({
        endpoint: `/employees`,
        method: Method.GET,
        params: query,
      }),
    }),
  }),
});

export const { useGetEmployeeInfoQuery, useGetEmployeesQuery } =
  employeeServive;
