import { Button, Text, View } from '@components';
import SelectBox, { SelectOption } from '@components/common/select-box';

import { MonitoringEventType, MonitoringEmotion } from '@utils/types/monitoring.type';

import React, { useMemo, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

export interface MonitoringFilterValue {
  employeeId?: number;

  cameraSourceKey?: string;

  eventType?: MonitoringEventType;

  emotion?: MonitoringEmotion;
}

interface Employee {
  id: number;
  fullName: string;
}

interface Camera {
  cameraSourceKey: string;
  displayName: string;
  area: string;
  active: boolean;
}

interface MetadataOption<T = string> {
  value: T;
  label: string;
}

interface MonitoringFilterContentProps {
  employees: Employee[];

  cameras: Camera[];

  eventTypes: MetadataOption<MonitoringEventType>[];

  emotions: MetadataOption<MonitoringEmotion>[];

  initialFilter?: MonitoringFilterValue;

  onDone: (filter: MonitoringFilterValue) => void;
}

const MonitoringFilterContent: React.FC<MonitoringFilterContentProps> = ({
  employees,
  cameras,
  eventTypes,
  emotions,
  initialFilter,
  onDone,
}) => {
  const [employeeId, setEmployeeId] = useState(
    initialFilter?.employeeId ? String(initialFilter.employeeId) : 'all',
  );

  const [eventType, setEventType] = useState(initialFilter?.eventType ?? 'all');

  const [emotion, setEmotion] = useState(initialFilter?.emotion ?? 'all');

  const [cameraSourceKey, setCameraSourceKey] = useState(initialFilter?.cameraSourceKey ?? 'all');

  /**
   * ==========================================================
   * EMPLOYEE OPTIONS
   * ==========================================================
   */

  const employeeOptions: SelectOption[] = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Employees',
      },

      ...employees.map(employee => ({
        value: String(employee.id),
        label: employee.fullName,
      })),
    ];
  }, [employees]);

  /**
   * ==========================================================
   * EVENT OPTIONS
   * ==========================================================
   */

  const eventOptions: SelectOption[] = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Events',
      },

      ...eventTypes.map(item => ({
        value: item.value,
        label: item.label,
      })),
    ];
  }, [eventTypes]);

  /**
   * ==========================================================
   * EMOTION OPTIONS
   * ==========================================================
   */

  const emotionOptions: SelectOption[] = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Emotions',
      },

      ...emotions.map(item => ({
        value: item.value,
        label: item.label,
      })),
    ];
  }, [emotions]);

  /**
   * ==========================================================
   * CAMERA OPTIONS
   * ==========================================================
   */

  const cameraOptions: SelectOption[] = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Cameras',
      },

      ...cameras.map(camera => ({
        value: camera.cameraSourceKey,
        label: camera.displayName,
      })),
    ];
  }, [cameras]);

  /**
   * ==========================================================
   * APPLY FILTER
   * ==========================================================
   */

  const handleApplyFilter = () => {
    Keyboard.dismiss();

    const filter: MonitoringFilterValue = {};

    /**
     * Employee
     */
    if (employeeId !== 'all') {
      filter.employeeId = Number(employeeId);
    }

    /**
     * Camera
     */
    if (cameraSourceKey !== 'all') {
      filter.cameraSourceKey = cameraSourceKey;
    }

    /**
     * Event
     */
    if (eventType !== 'all') {
      filter.eventType = eventType as MonitoringEventType;
    }

    /**
     * Emotion
     */
    if (emotion !== 'all') {
      filter.emotion = emotion as MonitoringEmotion;
    }

    console.log('Monitoring API Filter:', filter);

    onDone(filter);
  };

  return (
    <View
      flex={1}
      paddingHorizontal={16}
      gap={16}
      paddingTop={8}
      style={styles.container}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();

        return false;
      }}
    >
      <View gap={12}>
        <Text weight={600} size={20} style={styles.title}>
          Filter Log
        </Text>

        {/* EMPLOYEE */}

        <SelectBox
          label="Employee"
          placeholder="All Employees"
          searchPlaceholder="Search employees"
          searchLabel="Employee Name"
          options={employeeOptions}
          value={employeeId}
          onChange={value => {
            setEmployeeId(value);
          }}
        />

        {/* EVENT */}

        <SelectBox
          label="Monitoring Event"
          placeholder="All Events"
          searchPlaceholder="Search events"
          searchLabel="Event"
          options={eventOptions}
          value={eventType}
          onChange={value => {
            setEventType(value);
          }}
        />

        {/* EMOTION */}

        <SelectBox
          label="Emotion"
          placeholder="All Emotions"
          searchPlaceholder="Search emotions"
          searchLabel="Emotion"
          options={emotionOptions}
          value={emotion}
          onChange={value => {
            setEmotion(value);
          }}
        />

        {/* CAMERA */}

        <SelectBox
          label="Camera"
          placeholder="All Cameras"
          searchPlaceholder="Search cameras"
          searchLabel="Camera"
          options={cameraOptions}
          value={cameraSourceKey}
          onChange={value => {
            setCameraSourceKey(value);
          }}
        />
      </View>

      <Button title="FILTER" onPress={handleApplyFilter} />
    </View>
  );
};

export default MonitoringFilterContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  title: {
    textAlign: 'center',
  },
});
