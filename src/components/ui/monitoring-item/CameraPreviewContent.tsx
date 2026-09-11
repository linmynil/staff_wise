import { Text, View } from '@components';

import { useGetMonitoringCameraPlaybackQuery } from '@services/monitoring';

import { MonitoringCameraSource } from '@utils/types/monitoring.type';

import React from 'react';

import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import Video from 'react-native-video';

interface CameraPreviewContentProps {
  camera: MonitoringCameraSource;

  onClose: () => void;
}

const CameraPreviewContent: React.FC<CameraPreviewContentProps> = ({ camera, onClose }) => {
  /**
   * ==========================================================
   * PLAYBACK API
   * ==========================================================
   */

  const {
    data: playback,
    isLoading,
    isError,
  } = useGetMonitoringCameraPlaybackQuery(camera.cameraSourceKey);

  /**
   * ==========================================================
   * VIDEO URL
   * ==========================================================
   */

  const videoUrl = playback?.playbackHlsUrl ?? camera.playbackHlsUrl;

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View row center space_between style={styles.header}>
        <View style={styles.titleContainer}>
          <Text size={20} weight={700}>
            {camera.displayName}
          </Text>

          <Text size={12} style={styles.location}>
            {camera.area}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.closeButton} onPress={onClose}>
          <Text size={20} weight={600}>
            ×
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* VIDEO */}

        <View style={styles.videoContainer}>
          {isLoading ? (
            <View style={styles.videoLoading}>
              <ActivityIndicator />

              <Text size={12} style={styles.videoLoadingText}>
                Loading camera...
              </Text>
            </View>
          ) : isError || !videoUrl ? (
            <View style={styles.videoLoading}>
              <Text size={14} weight={600} style={styles.videoError}>
                Unable to play camera
              </Text>
            </View>
          ) : (
            <Video
              source={{
                uri: videoUrl,
              }}
              style={styles.video}
              resizeMode="contain"
              controls
              paused={false}
              repeat={false}
              playInBackground={false}
              playWhenInactive={false}
              onError={error => {
                console.log('Camera video error:', error);
              }}
            />
          )}
        </View>

        {/* STATUS */}

        <View style={styles.statusContainer}>
          <View row center>
            <View style={[styles.liveDot, !camera.active && styles.inactiveDot]} />

            <Text size={13} weight={600}>
              {camera.active ? 'Camera is active' : 'Camera đang offline'}
            </Text>
          </View>
        </View>

        {/* CAMERA INFORMATION */}

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text size={12} style={styles.label}>
              Camera
            </Text>

            <Text size={14} weight={600}>
              {camera.displayName}
            </Text>
          </View>

          {/* <View style={styles.infoRow}>
            <Text size={12} style={styles.label}>
              Camera Key
            </Text>

            <Text size={13} weight={600}>
              {camera.cameraSourceKey}
            </Text>
          </View> */}

          <View style={styles.infoRow}>
            <Text size={12} style={styles.label}>
              Location
            </Text>

            <Text size={14} weight={600}>
              {camera.area}
            </Text>
          </View>

          {/* <View style={styles.infoRow}>
            <Text size={12} style={styles.label}>
              Source
            </Text>

            <Text size={14} weight={600}>
              {camera.sourceType}
            </Text>
          </View> */}

          {/* <View style={styles.infoRow}>
            <Text size={12} style={styles.label}>
              Retention
            </Text>

            <Text size={14} weight={600}>
              {camera.effectiveRetentionDays} ngày
            </Text>
          </View> */}

          <View style={styles.infoRow}>
            <Text size={12} style={styles.label}>
              Status
            </Text>

            <Text size={14} weight={600}>
              {camera.active ? 'Monitoring' : 'Offline'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CameraPreviewContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  header: {
    minHeight: 60,
  },

  titleContainer: {
    flex: 1,
    paddingRight: 10,
  },

  location: {
    color: '#777',
    marginTop: 4,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111827',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  videoLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoLoadingText: {
    color: '#94A3B8',
    marginTop: 8,
  },

  videoError: {
    color: '#FCA5A5',
  },

  statusContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
    backgroundColor: '#22C55E',
  },

  inactiveDot: {
    backgroundColor: '#94A3B8',
  },

  infoContainer: {
    paddingTop: 8,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  label: {
    width: 95,
    color: '#888',
  },
});
