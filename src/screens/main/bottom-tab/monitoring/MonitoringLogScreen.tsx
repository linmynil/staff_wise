import { EmptyData, Text, View } from '@components';
import MainLayout from '@components/layout/main-layout';

import { useGetMonitoringEventsQuery } from '@services/monitoring';

import { MonitoringEvent, MonitoringEventType } from '@utils/types/monitoring.type';

import React from 'react';

import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

interface MonitoringLogScreenProps {
  route: any;
}

const MonitoringLogScreen = ({ route }: MonitoringLogScreenProps) => {
  const filter = route?.params?.filter ?? {};

  console.log('Monitoring Logs Filter:', filter);

  /**
   * ==========================================================
   * API
   * ==========================================================
   */

  const { data, isLoading, isFetching, isError, refetch } = useGetMonitoringEventsQuery({
    page: 1,

    limit: 20,

    ...filter,
  });

  const logs = data?.data ?? [];

  const total = data?.meta?.total ?? 0;

  /**
   * ==========================================================
   * EVENT LABEL
   * ==========================================================
   */

  const getEventLabel = (eventType: string) => {
    switch (eventType) {
      case 'PRESENCE_LEFT_DESK':
        return 'Left Desk';

      case 'PRESENCE_RETURNED_TO_DESK':
        return 'Returned to Desk';

      case 'EMOTION_DETECTED':
        return 'Emotion Detected';

      default:
        return eventType;
    }
  };

  /**
   * ==========================================================
   * RESULT
   * ==========================================================
   */

  const getResult = (item: MonitoringEvent) => {
    if (item.eventType === 'EMOTION_DETECTED') {
      switch (item.eventData?.emotion) {
        case 'SAD':
          return 'Sad';

        case 'HAPPY':
          return 'Happy';

        case 'NEUTRAL':
          return 'Neutral';

        default:
          return 'Unknown';
      }
    }

    if (item.eventType === 'PRESENCE_LEFT_DESK') {
      if (item.eventData?.absenceDurationSeconds) {
        return `Left Desk ${Math.round(
          Number(item.eventData.absenceDurationSeconds) / 60,
        )} minutes`;
      }

      return 'Left Desk';
    }

    if (item.eventType === 'PRESENCE_RETURNED_TO_DESK') {
      return 'Returned to Desk';
    }

    return 'Unknown';
  };

  /**
   * ==========================================================
   * DATE
   * ==========================================================
   */

  const formatDate = (date: string) => {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return date;
    }

    return value.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  /**
   * ==========================================================
   * EVENT BADGE
   * ==========================================================
   */

  const renderEventBadge = (eventType: MonitoringEventType | string) => {
    const isEmotion = eventType === 'EMOTION_DETECTED';

    return (
      <View style={[styles.eventBadge, isEmotion ? styles.emotionBadge : styles.behaviorBadge]}>
        <Text size={11} weight={600}>
          {getEventLabel(eventType)}
        </Text>
      </View>
    );
  };

  /**
   * ==========================================================
   * LOG ITEM
   * ==========================================================
   */

  const renderLog = ({ item }: { item: MonitoringEvent }) => {
    return (
      <View style={styles.logCard}>
        {/* HEADER */}

        <View row center space_between>
          <Text size={16} weight={700}>
            {item.employee?.name ?? 'Unknown'}
          </Text>

          {renderEventBadge(item.eventType)}
        </View>

        {/* CAMERA */}

        <View style={styles.infoRow}>
          <Text size={12} style={styles.infoLabel}>
            Camera
          </Text>

          <Text size={13} weight={600}>
            {item.camera?.displayName ?? 'Unknown'}
          </Text>
        </View>

        {/* LOCATION */}

        <View style={styles.infoRow}>
          <Text size={12} style={styles.infoLabel}>
            Location
          </Text>

          <Text size={13} weight={600}>
            {item.camera?.area ?? 'Unknown'}
          </Text>
        </View>

        {/* EVENT */}

        <View style={styles.infoRow}>
          <Text size={12} style={styles.infoLabel}>
            Event
          </Text>

          <Text size={13} weight={600}>
            {getEventLabel(item.eventType)}
          </Text>
        </View>

        {/* RESULT */}

        <View style={styles.infoRow}>
          <Text size={12} style={styles.infoLabel}>
            Result
          </Text>

          <Text size={13} weight={600}>
            {getResult(item)}
          </Text>
        </View>

        {/* CONFIDENCE */}

        <View style={styles.infoRow}>
          <Text size={12} style={styles.infoLabel}>
            Confidence
          </Text>

          <Text size={13} weight={600}>
            {(Number(item.confidence) * 100).toFixed(1)}%
          </Text>
        </View>

        {/* TIME */}

        <View style={styles.infoRow}>
          <Text size={12} style={styles.infoLabel}>
            Time
          </Text>

          <Text size={12} style={styles.time}>
            {formatDate(item.detectedAt)}
          </Text>
        </View>
      </View>
    );
  };

  /**
   * ==========================================================
   * LOADING
   * ==========================================================
   */

  if (isLoading) {
    return (
      <MainLayout back={<MainLayout.BackToPreviousButton />} title="Monitoring Logs">
        <View style={styles.loading}>
          <ActivityIndicator />

          <Text size={12} style={styles.loadingText}>
            Loading logs...
          </Text>
        </View>
      </MainLayout>
    );
  }

  /**
   * ==========================================================
   * ERROR
   * ==========================================================
   */

  if (isError) {
    return (
      <MainLayout back={<MainLayout.BackToPreviousButton />} title="Monitoring Logs">
        <View style={styles.loading}>
          <Text size={14} weight={600}>
            Cannot load monitoring logs
          </Text>

          <Text
            size={12}
            style={styles.loadingText}
            onPress={() => {
              refetch();
            }}
          >
            Press to try again
          </Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />} title="Monitoring Logs">
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <View row center space_between>
            <Text size={18} weight={700}>
              Monitoring Logs
            </Text>

            <Text size={12} style={styles.total}>
              {total} logs
            </Text>
          </View>

          {/* FILTER SUMMARY */}

          <View row style={styles.filterSummary}>
            {filter.employeeId && (
              <View style={styles.filterTag}>
                <Text size={11}>Employee #{filter.employeeId}</Text>
              </View>
            )}

            {filter.eventType && (
              <View style={styles.filterTag}>
                <Text size={11}>{getEventLabel(filter.eventType)}</Text>
              </View>
            )}

            {filter.emotion && (
              <View style={styles.filterTag}>
                <Text size={11}>{filter.emotion}</Text>
              </View>
            )}

            {filter.cameraSourceKey && (
              <View style={styles.filterTag}>
                <Text size={11}>{filter.cameraSourceKey}</Text>
              </View>
            )}
          </View>
        </View>

        {/* LIST */}

        <FlatList
          data={logs}
          keyExtractor={item => String(item.id)}
          renderItem={renderLog}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshing={isFetching}
          onRefresh={refetch}
          ListEmptyComponent={<EmptyData title="No monitoring logs available" />}
        />
      </View>
    </MainLayout>
  );
};

export default MonitoringLogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    paddingVertical: 10,
    marginBottom: 5,
  },

  total: {
    color: '#888',
  },

  filterSummary: {
    marginTop: 10,
    gap: 7,
    flexWrap: 'wrap',
  },

  filterTag: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 7,
    backgroundColor: '#E8F1FF',
  },

  list: {
    paddingTop: 8,
    paddingBottom: 30,
    gap: 12,
  },

  logCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 5,

    elevation: 2,
  },

  eventBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  emotionBadge: {
    backgroundColor: '#F3E8FF',
  },

  behaviorBadge: {
    backgroundColor: '#DBEAFE',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  infoLabel: {
    width: 95,
    color: '#888',
  },

  time: {
    color: '#666',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#777',
  },
});
