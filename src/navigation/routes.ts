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
  MAIN_STAFF = 'main_staff',
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
}

enum StaffRoutes {
  STAFF_LEAVE_STATUS = 'staff_leave_status',
  STAFF_ADDITIONAL_LEAVE = 'staff_additional_leave',
}

export {
  RootRoutes,
  AuthRoutes,
  MainRoutes,
  TabRoutes,
  StaffRoutes,
  ChatRoutes,
  OtherRoutes,
};
