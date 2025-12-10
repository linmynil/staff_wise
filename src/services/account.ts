import { baseAPI, Method } from './baseAPI';

export enum Role {
  ADMIN = 'Admin',
  CEO = 'CEO',
  EMPLOYEE = 'Employee',
  MANAGER = 'Manager',
}

export interface AccountRole {
  id: number;
  accountId: number;
  roleId: number;
  createdAt: string;
  role: {
    id: number;
    name: Role;
    description: string;
  };
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
  employee: any;
}

export const accountServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getAccountInfo: buider.query<Account, number>({
      query: id => ({
        endpoint: `/accounts/${id}`,
        method: Method.GET,
      }),
    }),
  }),
});

export const { useGetAccountInfoQuery } = accountServive;
