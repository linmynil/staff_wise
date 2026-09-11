export type MonitoringEventType =
  | 'PRESENCE_LEFT_DESK'
  | 'PRESENCE_RETURNED_TO_DESK'
  | 'EMOTION_DETECTED';

export type MonitoringEmotion = 'SAD' | 'HAPPY' | 'NEUTRAL';

export type MonitoringSourceType = string;

export interface MonitoringEmployee {
  id: number;
  name: string;
}

export interface MonitoringCamera {
  cameraSourceKey: string;
  displayName: string;
  area: string;
  active: boolean;
}

export interface MonitoringEventData {
  emotion?: MonitoringEmotion;
  absenceDurationSeconds?: number;
  visibleDurationSeconds?: number;

  [key: string]: unknown;
}

export interface MonitoringEvent {
  id: number;
  eventId: string;

  eventType: MonitoringEventType | string;

  isConfirmed: boolean;

  employee: MonitoringEmployee;

  camera: MonitoringCamera;

  detectedAt: string;

  confidence: number;

  eventData: MonitoringEventData;
}

export interface GetMonitoringEventsRequest {
  page: number;
  limit: number;

  employeeId?: number;

  cameraSourceKey?: string;

  eventType?: MonitoringEventType;

  emotion?: MonitoringEmotion;

  sourceType?: MonitoringSourceType;

  fromDate?: string;

  toDate?: string;
}

export interface MonitoringEventsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetMonitoringEventsResponse {
  data: MonitoringEvent[];
  meta: MonitoringEventsMeta;
}

export interface MonitoringMetadataOption<T = string> {
  value: T;
  label: string;
}

export interface MonitoringMetadataResponse {
  eventTypes: MonitoringMetadataOption<MonitoringEventType>[];

  emotions: MonitoringMetadataOption<MonitoringEmotion>[];
}

export interface MonitoringSummaryResponse {
  totalEvents: number;
  totalEmotionEvents: number;
  activeAlerts: number;
  unmatchedEvents: number;
}

export interface MonitoringCameraSource {
  cameraSourceKey: string;

  displayName: string;

  area: string;

  sourceType: MonitoringSourceType;

  playbackHlsUrl: string;

  retentionDays: number | null;

  effectiveRetentionDays: number;

  active: boolean;

  streamStartTime: string;
}

export interface GetMonitoringCameraSourcesResponse {
  cameras: MonitoringCameraSource[];
}

export interface MonitoringPlaybackResponse {
  cameraSourceKey: string;

  displayName: string;

  area: string;

  sourceType: MonitoringSourceType;

  playbackHlsUrl: string;

  retentionDays: number | null;

  effectiveRetentionDays: number;

  active: boolean;

  streamStartTime: string;
}
