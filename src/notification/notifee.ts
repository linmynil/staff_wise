import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';

export const CHANNEL_ID = 'staffwise-default';

export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'StaffWise Notification',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    vibration: true,
    sound: 'default',
  });
};

// export const displayNotification = async (
//   title: string,
//   body: string,
//   data: Record<string, string>,
// ) => {
//   await notifee.displayNotification({
//     title,
//     body,
//     data,
//     android: {
//       channelId: CHANNEL_ID,
//       importance: AndroidImportance.HIGH,
//       pressAction: {
//         id: 'default',
//       },
//       smallIcon: 'ic_launcher',
//     },
//   });
// };
export const displayNotification = async (
  title: string,
  body: string,
  data: Record<string, string>,
) => {
  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId: CHANNEL_ID,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
      smallIcon: 'ic_launcher',
    },
  });
};

export const onPressNotification = (callback: (data?: Record<string, string>) => void) => {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      callback(detail.notification?.data as Record<string, string>);
    }
  });
};

export const cancelAllNotification = async () => {
  await notifee.cancelAllNotifications();
};
