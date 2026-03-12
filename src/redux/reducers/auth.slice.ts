import { getString, removeKey, setString } from '@config/mmkv';
import { createSlice } from '@reduxjs/toolkit';
import { Account } from '@utils/types/account.type';
import { Role } from '@utils/types/role.type';

export interface AuthState {
  isSignedIn: boolean;
  avatarUri: string;
  access_token: string | null;
  refresh_token: string | null;
  roles: Role[];
  permissions: string[];
  account: Account;
}

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

const initialState: AuthState = {
  isSignedIn: !!getString(TokenType.ACCESS_TOKEN),
  avatarUri: '',
  access_token: getString(TokenType.ACCESS_TOKEN),
  refresh_token: getString(TokenType.REFRESH_TOKEN),
  roles: [],
  permissions: [],
  account: {} as Account,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { access_token, refresh_token, roles, permissions, account } = action.payload;
      state.isSignedIn = !!access_token;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.roles = roles;
      state.permissions = permissions;
      state.account = account;
      if (access_token) {
        setString(TokenType.ACCESS_TOKEN, access_token);
      }
      if (refresh_token) {
        setString(TokenType.REFRESH_TOKEN, refresh_token);
      }
    },
    removeToken: state => {
      state.isSignedIn = false;
      state.access_token = null;
      state.refresh_token = null;
      state.avatarUri = '';
      state.roles = [];
      state.permissions = [];
      state.account = {} as Account;
      removeKey(TokenType.ACCESS_TOKEN);
      removeKey(TokenType.REFRESH_TOKEN);
    },
    setAvatar: (state, action) => {
      state.avatarUri = action.payload;
    },
  },
});

export const { setToken, removeToken, setAvatar } = authSlice.actions;

export default authSlice.reducer;
