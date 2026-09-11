export enum NotificationType {
  MENTAL_HEALTH = 'MENTAL_HEALTH',
  LEAVE_POSITION = 'LEAVE_POSITION',
}

export enum NotificationScreen {
  HOME_MANAGE_ACCOUNT = 'HOME_MANAGE_ACCOUNT',
  HOME_MANAGE_EMPLOYEE = 'HOME_MANAGE_EMPLOYEE',
  LEAVE_STATUS = 'LEAVE_STATUS',
  HOME_MANAGE_LEAVE_REQUESTS = 'HOME_MANAGE_LEAVE_REQUESTS',
}

export enum NotificationAction {
  OPEN_SCREEN = 'OPEN_SCREEN',
}
export enum DevicePlatform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}

export interface RegisterFCMTokenBody {
  token: string;
  platform: DevicePlatform;
  deviceId: string;
  deviceName: string;
}

export interface RegisterFCMTokenResponse {
  success: boolean;
  message: string;
}

export interface LogoutFCMTokenBody {
  token: string;
}

export interface LogoutFCMTokenResponse {
  success: boolean;
  message: string;
}
export interface NotificationData {
  type?: NotificationType | string;
  action?: NotificationAction | string;
  screen?: NotificationScreen | string;
  source?: string;
  [key: string]: string | undefined;
}

export interface NotificationItem {
  id: number;
  recipientEmployeeId: number;
  type: string;
  title: string;
  body: string;
  data: NotificationData;
  readAt: string | null;
  createdAt: string;
}

export interface GetNotificationsParams {
  page: number;
  limit: number;
}

export interface GetNotificationsResponse {
  data: NotificationItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MarkNotificationReadResponse {
  id: number;
  recipientEmployeeId: number;
  type: string;
  title: string;
  body: string;
  data: NotificationData;
  readAt: string | null;
  createdAt: string;
}
