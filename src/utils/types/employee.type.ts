import { Account } from './account.type';
import { IMeta } from './other.type';

export interface Employee {
  id: number;
  accountId?: number;
  employeeCode: string | null;
  fullName: string;
  phone?: string;
  department?: string | null;
  position?: string | null;
  managerId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  account?: Account;
  manager?: {
    id: number;
    fullName: string;
    employeeCode: string | null;
  } | null;
  subordinates?: Employee;
}

export interface GetEmployeeWithPaginationRequest {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  managerId?: number;
}

export interface GetEmployeeWithPaginationResponse {
  data: Employee[];
  meta: IMeta;
}

export interface UpdateEmployeeBody {
  id: number;
  body: {
    employeeCode?: string;
    fullName?: string;
    phone?: string;
    department?: string;
    position?: string;
    managerId?: number;
    roleIds?: number[];
  };
}
