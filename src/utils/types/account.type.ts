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
  employee: any;
}
