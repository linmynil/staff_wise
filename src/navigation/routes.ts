enum RootRoutes {
  AUTH = 'auth',
  MAIN = 'main',
}

enum AuthRoutes {
  LOGIN = 'login',
  CHANGE_PASSWORD = 'change_password',
}

enum MainRoutes {
  DRAWER_TAB = 'drawer_tab',
  BOTTOM_TAB = 'bottom_tab',
  STAFF = 'staff',
  ADMIN = 'admin',
  MANAGER = 'manager',
  CHAT_MAIN = 'chat_main',
  OTHER = 'other',
}

enum TabRoutes {
  CHAT = 'chat',
  HOME = 'home',
  APPLY_LEAVE = 'apply_leave',
  OTHER = 'other',
}

enum ChatRoutes {
  CHAT_SCREEN = 'chat_screen',
}

enum OtherRoutes {
  OTHER_CHANGE_PASSWORD = 'other_change_password',
}

enum StaffRoutes {
  LEAVE_STATUS = 'leave_status',
  ADDITIONAL_LEAVE = 'additional_leave',
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
