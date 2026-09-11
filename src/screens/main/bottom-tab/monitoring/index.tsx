import { FilterIcon } from '@assets';
import { EmptyData, Text, View } from '@components';

import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';

import MainLayout from '@components/layout/main-layout';

import CameraPreviewContent from '@components/ui/monitoring-item/CameraPreviewContent';

import MonitoringFilterContent, {
  MonitoringFilterValue,
} from '@components/ui/monitoring-item/MonitoringFilterContent';

import { HomeRoutes } from '@navigation/routes';

import {
  useGetMonitoringCameraSourcesQuery,
  useGetMonitoringMetadataQuery,
} from '@services/monitoring';

import { useGetEmployeesNoPaginationQuery } from '@services/employee';

import { MonitoringCameraSource } from '@utils/types/monitoring.type';

import colors from '@utils/constants/colors';
import { height } from '@utils/helpers/dimension';

import React from 'react';

import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MonitoringScreen = ({ navigation }: any) => {
  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();

  /**
   * ==========================================================
   * CAMERAS API
   * ==========================================================
   */

  const {
    data: cameraResponse,
    isLoading: isCameraLoading,
    isFetching: isCameraFetching,
  } = useGetMonitoringCameraSourcesQuery({});

  const cameras = cameraResponse?.cameras ?? [];

  /**
   * ==========================================================
   * EMPLOYEES API
   * ==========================================================
   */

  const { data: employeeResponse, isLoading: isEmployeeLoading } = useGetEmployeesNoPaginationQuery(
    {},
  );

  const employees = employeeResponse ?? [];

  /**
   * ==========================================================
   * METADATA API
   * ==========================================================
   */

  const { data: metadata, isLoading: isMetadataLoading } = useGetMonitoringMetadataQuery({});

  const eventTypes = metadata?.eventTypes ?? [];

  const emotions = metadata?.emotions ?? [];

  /**
   * ==========================================================
   * CAMERA PRESS
   * ==========================================================
   */

  const handleCameraPress = (camera: MonitoringCameraSource) => {
    openBottomSheet2({
      snapPoints: [height * 0.85, height * 0.95],

      fixSnapPoints: true,

      content: <CameraPreviewContent camera={camera} onClose={closeBottomSheet2} />,
    });
  };

  /**
   * ==========================================================
   * OPEN FILTER
   * ==========================================================
   */

  const handleOpenFilter = () => {
    openBottomSheet2({
      snapPoints: [height * 0.7, height * 0.9],

      fixSnapPoints: true,

      content: (
        <MonitoringFilterContent
          employees={employees}
          cameras={cameras}
          eventTypes={eventTypes}
          emotions={emotions}
          onDone={handleFilterDone}
        />
      ),
    });
  };

  /**
   * ==========================================================
   * FILTER DONE
   * ==========================================================
   */

  const handleFilterDone = (filter: MonitoringFilterValue) => {
    console.log('Monitoring Filter:', filter);

    closeBottomSheet2();

    navigation.navigate(HomeRoutes.MONITORING_LOG, {
      filter,
    });
  };

  /**
   * ==========================================================
   * CAMERA ITEM
   * ==========================================================
   */

  const renderCamera = ({ item }: { item: MonitoringCameraSource }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cameraCard}
        onPress={() => handleCameraPress(item)}
      >
        {/* HEADER */}

        <View row center space_between style={styles.cameraHeader}>
          <View style={styles.cameraTitleContainer}>
            <Text size={15} weight={700} numberOfLines={1}>
              {item.displayName}
            </Text>

            <Text size={10} numberOfLines={1} style={styles.cameraLocation}>
              {item.area}
            </Text>
          </View>

          {/* STATUS */}

          <View row center>
            <View style={[styles.liveDot, !item.active && styles.inactiveDot]} />

            <Text
              size={10}
              weight={700}
              style={[styles.liveText, !item.active && styles.inactiveText]}
            >
              {item.active ? 'LIVE' : 'OFFLINE'}
            </Text>
          </View>
        </View>

        {/* VIDEO */}

        <View style={styles.videoContainer}>
          <View style={styles.videoContent}>
            <View style={styles.cameraIconCircle}>
              <Text size={20} weight={700} style={styles.cameraIcon}>
                ●
              </Text>
            </View>

            <Text size={12} weight={600} style={styles.videoText}>
              {item.sourceType}
            </Text>

            <Text size={10} style={styles.videoHint}>
              Tap to enlarge
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * ==========================================================
   * LOADING
   * ==========================================================
   */

  const isLoading = isCameraLoading || isCameraFetching || isEmployeeLoading || isMetadataLoading;

  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Monitoring"
      next={<FilterIcon fill={colors.white} onPress={handleOpenFilter} />}
    >
      <View style={styles.container}>
        {/* TITLE */}

        <View style={styles.titleContainer}>
          <Text size={20} weight={700}>
            Employee Monitoring
          </Text>

          <Text size={12} style={styles.description}>
            Monitor employee activity through surveillance cameras
          </Text>
        </View>

        {/* CAMERA HEADER */}

        <View row center style={styles.cameraSectionHeader}>
          <Text size={14} weight={700}>
            Camera
          </Text>

          <View style={styles.cameraCount}>
            <Text size={11} weight={700} style={styles.cameraCountText}>
              {cameras.length}
            </Text>
          </View>
        </View>

        {/* LOADING */}

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" />

            <Text size={12} style={styles.loadingText}>
              Loading data...
            </Text>
          </View>
        ) : (
          <FlatList
            data={cameras}
            keyExtractor={item => item.cameraSourceKey}
            renderItem={renderCamera}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cameraList}
            ListEmptyComponent={<EmptyData title="No monitoring cameras available" />}
          />
        )}
      </View>
    </MainLayout>
  );
};

export default MonitoringScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  titleContainer: {
    marginTop: 8,
    marginBottom: 18,
  },

  description: {
    color: '#777',
    marginTop: 4,
  },

  cameraSectionHeader: {
    marginBottom: 12,
  },

  cameraCount: {
    width: 24,
    height: 24,
    marginLeft: 7,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F1FF',
  },

  cameraCountText: {
    color: '#2563EB',
  },

  cameraList: {
    paddingBottom: 30,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  cameraCard: {
    width: '48.5%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 3,
  },

  cameraHeader: {
    minHeight: 58,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },

  cameraTitleContainer: {
    flex: 1,
    paddingRight: 5,
  },

  cameraLocation: {
    color: '#888',
    marginTop: 3,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
    backgroundColor: '#22C55E',
  },

  inactiveDot: {
    backgroundColor: '#94A3B8',
  },

  liveText: {
    color: '#22C55E',
  },

  inactiveText: {
    color: '#94A3B8',
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: '#111827',
  },

  videoContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    backgroundColor: '#1F2937',
  },

  cameraIcon: {
    color: '#94A3B8',
  },

  videoText: {
    color: '#E5E7EB',
  },

  videoHint: {
    color: '#94A3B8',
    marginTop: 3,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 8,
    color: '#777',
  },
});
