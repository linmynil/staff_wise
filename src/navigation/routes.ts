enum RootRoutes {
  AUTH = 'auth',
  MAIN = 'main',
}

enum AuthRoutes {
  LOGIN = 'login',
}

enum MainRoutes {
  DRAWER_TAB = 'drawer_tab',
  BOTTOM_TAB = 'bottom_tab',
  STAFF = 'staff',
  ADMIN = 'admin',
  MANAGER = 'manager',
  CHAT_MAIN = 'chat_main',
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
};
