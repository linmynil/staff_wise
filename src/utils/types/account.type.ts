import { Employee } from './employee.type';
import { IMeta } from './other.type';
import { IRole } from './role.type';

export interface AccountRole {
  id: number;
  accountId: number;
  roleId: number;
  createdAt: string;
  role: IRole;
}

export interface Account {
  id: number;
  username: string;
  email: string;
  isActive?: boolean;
  mustChangePassword: boolean;
  createdAt?: string;
  updatedAt?: string;
  accountRoles?: AccountRole[];
  employee: Employee;
}

export interface AccountInfoView {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
}

export interface GetAccountRequest {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean | string;
}

export interface GetAccountResponse {
  data: Account[];
  meta: IMeta;
}

export interface CreateAccountWithEmployeeBody {
  username: string;
  email?: string;
  password: string;
  roleIds: number[];
  employeeCode?: string;
  fullName: string;
  phone?: string;
  department?: string;
  position?: string;
  managerId?: number;
}

export interface UpdateAccountBody {
  id: number;
  body: {
    username?: string;
    email?: string;
    password?: string;
    roleIds?: number[];
    isActive?: boolean;
  };
}
