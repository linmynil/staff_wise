import { Role } from '@utils/types/role.type';
import colors from './colors';

export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SOCIAL_INSURANCE = 'SOCIAL_INSURANCE',
  UNPAID = 'UNPAID',
  OTHER = 'OTHER',
}

export const leaveTypeOptions = [
  { value: '_', label: 'All' },
  { value: LeaveType.ANNUAL, label: 'Annual' },
  { value: LeaveType.SOCIAL_INSURANCE, label: 'Social insurance' },
  { value: LeaveType.UNPAID, label: 'Unpaid' },
  { value: LeaveType.OTHER, label: 'Other' },
];

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum StatusValue {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  CANCELLED = 'Cancelled',
}

export const leaveStatusOptions = [
  { value: '_', label: 'All' },
  { value: LeaveStatus.PENDING, label: StatusValue.PENDING },
  { value: LeaveStatus.APPROVED, label: StatusValue.APPROVED },
  { value: LeaveStatus.REJECTED, label: StatusValue.REJECTED },
  { value: LeaveStatus.CANCELLED, label: StatusValue.CANCELLED },
];

export const fullDayOptions = [
  {
    value: 'true',
    label: 'Yes',
  },
  {
    value: 'false',
    label: 'No',
  },
];

export const roleForGetEmployee = [Role.ADMIN, Role.MANAGER];

export type LeaveStatusValueMap = {
  color: string;
  backgroundColor: string;
  value: string;
};

export const leaveStatusMap: Record<LeaveStatus, LeaveStatusValueMap> = {
  [LeaveStatus.PENDING]: {
    color: colors.orange.c500,
    backgroundColor: colors.orange.c200,
    value: StatusValue.PENDING,
  },
  [LeaveStatus.APPROVED]: {
    color: colors.green.c500,
    backgroundColor: colors.green.c100,
    value: StatusValue.APPROVED,
  },
  [LeaveStatus.REJECTED]: {
    color: colors.red.c600,
    backgroundColor: colors.red.c100,
    value: StatusValue.REJECTED,
  },
  [LeaveStatus.CANCELLED]: {
    color: colors.neutral.c500,
    backgroundColor: colors.neutral.c100,
    value: StatusValue.CANCELLED,
  },
};
