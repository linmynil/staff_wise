enum RootRoutes {
  AUTH = 'auth',
  MAIN = 'main',
}

enum TabRoutes {
  CHAT = 'chat',
  HOME = 'home',
  APPLY_LEAVE = 'apply_leave',
  OTHER = 'other',
}

enum MainRoutes {
  MAIN_DRAWER_TAB = 'main_drawer_tab',
  MAIN_BOTTOM_TAB = 'main_bottom_tab',
  MAIN_HOME = 'main_home',
  MAIN_CHAT = 'main_chat',
  MAIN_OTHER = 'main_other',
}

enum AuthRoutes {
  AUTH_LOGIN = 'auth_login',
  AUTH_CHANGE_PASSWORD = 'auth_change_password',
}

enum ChatRoutes {
  CHAT_SCREEN = 'chat_screen',
}

enum OtherRoutes {
  OTHER_CHANGE_PASSWORD = 'other_change_password',
  OTHER_ACCOUNT_INFO = 'other_account_info',
  OTHER_UPDATE_ACCOUNT_INFO = 'other_update_account_info',
}

enum HomeRoutes {
  // employee
  HOME_EMPLOYEE_INFO = 'home_emloyee_info',
  HOME_UPDATE_INFO_EMPLOYEE = 'home_update_info_employee',
  HOME_MANAGE_EMPLOYEE = 'home_manage_employee',

  // account
  HOME_CREATE_ACOUNT_WITH_EMPLOYEE = 'home_create_account_with_employee',
  HOME_ACCOUNT_INFO = 'home_account_info',
  HOME_UPDATE_INFO_ACCOUNT = 'home_update_info_account',
  HOME_MANAGE_ACCOUNT = 'home_manager_account',

  // leave
  LEAVE_STATUS = 'leave_status',
  APPLY_LEAVE = 'apply_leave',
  HOME_MANAGE_LEAVE_REQUESTS = 'home_manage_leave_requests',
  // leave balance
  HOME_MANAGE_LEAVE_BALANCE = 'home_manage_leave_balance',
  HOME_CREATE_LEAVE_BALANCE = 'home_create_leave_balance',
  HOME_CREATE_LEAVE_BALANCE_REFILL = 'home_create_leave_balance_refill',
  HOME_CREATE_LEAVE_BALANCE_BONUS = 'home_create_leave_balance_bonus',
}

export { RootRoutes, AuthRoutes, MainRoutes, TabRoutes, ChatRoutes, OtherRoutes, HomeRoutes };
