import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { EmptyData, Text, View } from '@components';
import MainLayout from '@components/layout/main-layout';

const NotificationDetailScreen = ({ route }: any) => {
  const notification = route?.params?.notification;

  if (!notification) {
    return (
      <MainLayout back={<MainLayout.BackToPreviousButton />} title="Notification Detail">
        <View style={styles.emptyContainer}>
          <EmptyData title="Notification not found" />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />} title="Notification Detail">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text size={22} weight={700} style={styles.title}>
          {notification.title}
        </Text>

        <Text size={13} style={styles.date}>
          {new Date(notification.createdAt).toLocaleString()}
        </Text>

        <View style={styles.divider} />

        <Text size={16} style={styles.body}>
          {notification.body}
        </Text>

        {notification.data && (
          <View style={styles.dataContainer}>
            <Text size={16} weight={700} style={styles.dataTitle}>
              Information
            </Text>

            {notification.data.type && (
              <Text style={styles.dataText}>Type: {notification.data.type}</Text>
            )}

            {notification.data.source && (
              <Text style={styles.dataText}>Source: {notification.data.source}</Text>
            )}

            {notification.data.action && (
              <Text style={styles.dataText}>Action: {notification.data.action}</Text>
            )}

            {notification.data.screen && (
              <Text style={styles.dataText}>Screen: {notification.data.screen}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </MainLayout>
  );
};

export default NotificationDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  emptyContainer: {
    flex: 1,
    padding: 16,
  },

  title: {
    marginTop: 4,
  },

  date: {
    marginTop: 8,
    color: '#999',
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },

  body: {
    color: '#333',
    lineHeight: 25,
  },

  dataContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },

  dataTitle: {
    marginBottom: 12,
  },

  dataText: {
    marginBottom: 6,
    color: '#555',
  },
});
