import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { PermissionsAndroid, Platform } from 'react-native';

export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      }
    }

    const authStatus = await messaging().requestPermission();

    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch {
    return false;
  }
};

export const getFCMToken = async () => {
  return await messaging().getToken();
};

export const onTokenRefreshListener = (callback: (token: string) => void) => {
  return messaging().onTokenRefresh(callback);
};

export const onForegroundNotification = (
  callback: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void,
) => {
  return messaging().onMessage(callback);
};

export const onBackgroundNotification = (
  callback: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void,
) => {
  return messaging().onNotificationOpenedApp(callback);
};

export const getInitialNotification = async () => {
  return await messaging().getInitialNotification();
};
