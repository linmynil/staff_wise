import { navigationRef } from '@navigation/navigationRef';
import { HomeRoutes, MainRoutes, RootRoutes } from '@navigation/routes';
import { store } from '@redux/store';
import { notificationService } from '@services/notification';

import { createNotificationChannel, displayNotification, onPressNotification } from './notifee';

import {
  getFCMToken,
  getInitialNotification,
  onBackgroundNotification,
  onForegroundNotification,
  onTokenRefreshListener,
  requestNotificationPermission,
} from './firebase';
import { DevicePlatform } from '@utils/types/notification.type';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { tagTypes } from '@services/baseAPI';

/**
 * ==========================================================
 * Firebase trả về:
 * {
 *    [key:string]: string | object
 * }
 *
 * Chuyển hết về string để dùng thống nhất trong project.
 * ==========================================================
 */

const parseNotificationData = (data?: Record<string, string | object>): Record<string, string> => {
  if (!data) {
    return {};
  }

  const result: Record<string, string> = {};

  Object.entries(data).forEach(([key, value]) => {
    result[key] = String(value);
  });

  return result;
};

/**
 * ==========================================================
 * Gửi FCM Token lên Backend
 * ==========================================================
 */

const registerFCMToken = async (token: string) => {
  try {
    await store.dispatch(
      notificationService.endpoints.registerFCMToken.initiate({
        token,
        platform: Platform.OS === 'android' ? DevicePlatform.ANDROID : DevicePlatform.IOS,
        deviceId: await DeviceInfo.getUniqueId(),
        deviceName: await DeviceInfo.getDeviceName(),
      }),
    );
  } catch (error) {
    console.log('Register FCM Token Error:', error);
  }
};

/**
 * ==========================================================
 * Điều hướng
 * ==========================================================
 */

const handleNotificationNavigation = () => {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.navigate(RootRoutes.MAIN, {
    screen: MainRoutes.MAIN_HOME,
    params: {
      screen: HomeRoutes.NOTIFICATION,
    },
  });
};

/**
 * ==========================================================
 * App đang mở
 * ==========================================================
 */

const registerForegroundNotification = () => {
  return onForegroundNotification(async remoteMessage => {
    console.log('Foreground Notification:', remoteMessage);

    await displayNotification(
      remoteMessage.notification?.title ?? '',
      remoteMessage.notification?.body ?? '',
      parseNotificationData(remoteMessage.data),
    );

    // Cập nhật lại danh sách notification
    store.dispatch(notificationService.util.invalidateTags([tagTypes.Notifications]));
  });
};

/**
 * ==========================================================
 * App chạy nền
 * ==========================================================
 */

const registerBackgroundNotification = () => {
  return onBackgroundNotification(() => {
    console.log('Background Notification');

    handleNotificationNavigation();
  });
};

/**
 * ==========================================================
 * App bị kill
 * ==========================================================
 */

const registerInitialNotification = async () => {
  const remoteMessage = await getInitialNotification();

  if (!remoteMessage) {
    return;
  }

  console.log('Initial Notification');

  handleNotificationNavigation();
};

/**
 * ==========================================================
 * User click Notification khi app đang mở
 * ==========================================================
 */

const registerPressNotification = () => {
  return onPressNotification(() => {
    console.log('Press Notification');

    handleNotificationNavigation();
  });
};

/**
 * ==========================================================
 * Firebase refresh token
 * ==========================================================
 */

const registerTokenRefresh = () => {
  return onTokenRefreshListener(async token => {
    console.log('Refresh FCM Token');

    await registerFCMToken(token);
  });
};

/**
 * ==========================================================
 * Init Notification
 * ==========================================================
 */
export const initNotification = async (hasEmployee: boolean) => {
  if (!hasEmployee) {
    console.log('Account has no employee. Skip notification initialization.');
    return;
  }

  try {
    await createNotificationChannel();

    const granted = await requestNotificationPermission();

    if (!granted) {
      console.log('Notification Permission Denied');
      return;
    }

    const token = await getFCMToken();

    console.log('FCM Token:', token);

    if (token) {
      await registerFCMToken(token);
    }

    registerForegroundNotification();
    registerBackgroundNotification();
    registerPressNotification();

    await registerInitialNotification();

    registerTokenRefresh();
  } catch (error) {
    console.log('Init Notification Error:', error);
  }
};
