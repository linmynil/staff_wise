export enum AuthErrorCode {
  ACCOUNT_INVALID_CREDENTIALS = 'ACCOUNT_INVALID_CREDENTIALS',
  ACCOUNT_OLD_PASSWORD_INCORRECT = 'ACCOUNT_OLD_PASSWORD_INCORRECT',
  ACCOUNT_NEW_PASSWORD_SAME_AS_OLD = 'ACCOUNT_NEW_PASSWORD_SAME_AS_OLD',
}

export const AuthErrorsMap: Record<string, string> = {
  [AuthErrorCode.ACCOUNT_INVALID_CREDENTIALS]: 'Invalid credentials',
  [AuthErrorCode.ACCOUNT_OLD_PASSWORD_INCORRECT]: 'Old password is incorrect',
  [AuthErrorCode.ACCOUNT_NEW_PASSWORD_SAME_AS_OLD]:
    'New password must be different from old password',
};
