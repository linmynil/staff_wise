import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useGetNotificationsQuery } from '@services/notification';

import Notification from '@assets/icons/Notification';
import { HomeRoutes, MainRoutes } from '@navigation/routes';

const NotificationBell = ({ navigation }: any) => {
  const { data, refetch } = useGetNotificationsQuery(
    {
      page: 1,
      limit: 100,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  /**
   * Mỗi lần Home được focus lại
   * => lấy notification mới nhất
   */
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const notifications = data?.data ?? [];

  const unreadCount = notifications.filter(notification => notification.readAt === null).length;

  const handlePress = () => {
    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.NOTIFICATION,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Notification width={18} height={21} />

      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -4,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default NotificationBell;
