import { Account } from './account.type';

export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  account: Account;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}
