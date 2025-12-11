import { createSlice } from '@reduxjs/toolkit';
import { Account } from '@utils/types/account.type';

export interface AccountState {
  accountInfo?: Account;
}

const initialState: AccountState = {
  accountInfo: undefined,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.accountInfo = action.payload;
    },
    resetAccountInfo: state => {
      state.accountInfo = undefined;
    },
  },
});

export const { setAccountInfo, resetAccountInfo } = accountSlice.actions;

export default accountSlice.reducer;
