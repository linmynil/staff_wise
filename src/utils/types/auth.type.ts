import { Account } from './account.type';
import { Role } from './role.type';

export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  account: Account;
  roles: Role[];
  permissions: string[];
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}
