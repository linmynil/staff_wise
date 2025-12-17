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
  manager?: string | null;
  subordinates?: any;
}

export interface GetEmployeeRequest {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  managerId?: number;
}

export interface GetEmployeeResponse {
  data: Employee[];
  meta: IMeta;
}
