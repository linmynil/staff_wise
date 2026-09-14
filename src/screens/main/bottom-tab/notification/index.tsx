import { EmptyData, Text, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@services/notification';
import { NotificationItem } from '@utils/types/notification.type';
import { LIMIT } from '@utils/constants/constants';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';

const initialQuery = {
  page: 1,
  limit: LIMIT,
};

const NotificationScreen = ({}: any) => {
  /**
   * ==========================================================
   * Query phân trang
   * ==========================================================
   */
  const [query, setQuery] = useState(initialQuery);

  /**
   * ==========================================================
   * Danh sách notification đã load
   * ==========================================================
   */
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  /**
   * ==========================================================
   * Còn notification để load hay không
   * ==========================================================
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * ==========================================================
   * Tránh onEndReached bị gọi nhiều lần
   * ==========================================================
   */
  const onEndReachedCalledDuringMomentum = useRef(true);

  /**
   * ==========================================================
   * API GET /notifications
   *
   * page = trang hiện tại
   * limit = số notification mỗi trang
   * ==========================================================
   */
  const { data, isFetching } = useGetNotificationsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  /**
   * ==========================================================
   * API PATCH /notifications/{id}/read
   * ==========================================================
   */
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

  /**
   * ==========================================================
   * Mỗi khi API trả dữ liệu
   *
   * page 1:
   *    thay toàn bộ danh sách
   *
   * page > 1:
   *    nối thêm notification vào danh sách cũ
   * ==========================================================
   */
  useEffect(() => {
    if (!data?.data) {
      return;
    }

    setNotifications(prev => {
      if (query.page === 1) {
        return data.data;
      }

      const merged = [...prev, ...data.data];

      const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());

      return unique.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    });

    setHasMore(query.page < (data.meta?.totalPages ?? query.page));
  }, [data, query.page]);
  /**
   * ==========================================================
   * Load trang tiếp theo
   * ==========================================================
   */
  const loadMore = () => {
    if (isFetching || !hasMore) {
      return;
    }

    setQuery(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  /**
   * ==========================================================
   * Pull to refresh
   *
   * Quay lại page 1
   * ==========================================================
   */
  const onRefresh = () => {
    setQuery({
      page: 1,
      limit: LIMIT,
    });
    setNotifications([]);
    setHasMore(true);
  };
  /**
   * ==========================================================
   * Bấm notification
   * ==========================================================
   */

  const handleNotificationPress = async (notification: NotificationItem) => {
    try {
      if (notification.readAt === null) {
        await markNotificationAsRead(notification.id).unwrap();

        // Cập nhật UI ngay lập tức thành đã đọc
        setNotifications(prev =>
          prev.map(item =>
            item.id === notification.id
              ? {
                  ...item,
                  readAt: new Date().toISOString(),
                }
              : item,
          ),
        );
      }
    } catch (error) {
      console.log('Mark notification read error:', error);
    }
  };
  /**
   * ==========================================================
   * Render từng notification
   * ==========================================================
   */
  const renderItem = ({ item }: { item: NotificationItem }) => {
    const isUnread = item.readAt === null;

    return (
      <TouchableOpacity
        style={[styles.item, isUnread && styles.unreadItem]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View row space_between center>
            <Text size={16} weight={700} style={styles.title}>
              {item.title}
            </Text>

            {isUnread && <View style={styles.unreadDot} />}
          </View>

          <Text size={14} style={styles.body} numberOfLines={2}>
            {item.body}
          </Text>

          <Text size={12} style={styles.date}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />} title="Notification">
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerFlatlist}
          /**
           * Pull to refresh
           */
          refreshControl={
            <RefreshControl refreshing={isFetching && query.page === 1} onRefresh={onRefresh} />
          }
          /**
           * Khi kéo tới cuối danh sách
           */
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (onEndReachedCalledDuringMomentum.current) {
              return;
            }

            loadMore();

            onEndReachedCalledDuringMomentum.current = true;
          }}
          onEndReachedThreshold={0.1}
          /**
           * Không có notification
           */
          ListEmptyComponent={
            isFetching && query.page === 1 ? <></> : <EmptyData title="No notifications" />
          }
          /**
           * Hiện loading ở cuối khi đang tải
           * page 2, page 3...
           */
          ListFooterComponent={
            isFetching && query.page > 1 ? (
              <View style={styles.loadingMore}>
                <Text size={13}>Loading more...</Text>
              </View>
            ) : null
          }
        />
      </View>
    </MainLayout>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  containerFlatlist: {
    gap: 12,
    paddingBottom: 20,
  },

  item: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },

  unreadItem: {
    backgroundColor: '#eef6ff',
  },

  content: {
    flex: 1,
  },

  title: {
    marginBottom: 6,
  },

  body: {
    color: '#555',
    lineHeight: 20,
  },

  date: {
    marginTop: 8,
    color: '#999',
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: 10,
  },

  loadingMore: {
    alignItems: 'center',
    paddingVertical: 16,
  },
});
