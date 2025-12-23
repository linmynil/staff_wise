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
  MAIN_EMPLOYEE = 'main_employee',
  MAIN_ADMIN = 'main_admin',
  MAIN_MANAGER = 'main_manager',
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

enum EmployeeRoutes {
  EMPLOYEE_LEAVE_STATUS = 'employee_leave_status',
  EMPLOYEE_ADDITIONAL_LEAVE = 'employee_additional_leave',
}
enum AdminRoutes {
  ADMIN_MANAGE_EMPLOYEE = 'admin_manage_employee',
  ADMIN_MANAGE_ACCOUNT = 'admin_manager_account',
  // employee
  ADMIN_EMPLOYEE_INFO = 'admin_emloyee_info',
  ADMIN_UPDATE_INFO_EMPLOYEE = 'admin_update_info_employee',
  // account
  ADMIN_CREATE_ACOUNT_WITH_EMPLOYEE = 'admin_create_account_with_employee',
}
export {
  RootRoutes,
  AuthRoutes,
  MainRoutes,
  TabRoutes,
  EmployeeRoutes,
  ChatRoutes,
  OtherRoutes,
  AdminRoutes,
};
