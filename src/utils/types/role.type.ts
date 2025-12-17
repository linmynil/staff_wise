export enum Role {
  ADMIN = 'Admin',
  CEO = 'CEO',
  EMPLOYEE = 'Employee',
  MANAGER = 'Manager',
  HR = 'HR',
}

export interface IPermission {
  id: number;
  name: string;
}

export interface IRole {
  id: number;
  name: Role;
  description: string;
  permissions?: IPermission[];
}

export interface GetRoleQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetRoleResponse {
  data: IRole[];
  meta: {
    total: number;
    pahe: number;
    limit: number;
    totalPages: 1;
  };
}
