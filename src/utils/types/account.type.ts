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
