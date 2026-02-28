import { Employee } from './employee.type';
import { IMeta } from './other.type';

export interface GetLeaveSummaryResponse {
  balance: Balance;
  leaveByType?: LeaveByType[];
  pendingRequests?: number;
  approvedThisMonth: number;
  upcomingLeave: any;
}

export interface CreateLeaveBalanceBody {
  employeeId: number;
  year: number;
  totalHours: number;
}

export interface Balance {
  id: 1;
  employeeId?: number;
  year?: number;
  totalHours?: number;
  usedHours?: number;
  remainingHours?: number;
  carryOverHours?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeaveBalanceRefillBody {
  year: number;
  defaultTotalHours: number;
  carryOver: boolean;
  maxCarryOverHours?: number;
  employeeIds: number[];
}

export interface CreateLeaveBalanceRefillResult {
  employeeId: number;
  status: string;
  totalHours: number;
  carryOverHours: number;
}

export interface CreateLeaveBalanceRefillResponse {
  year: number;
  processed: number;
  results: CreateLeaveBalanceRefillResult[];
}

export interface CreateLeaveBalanceBonusBody {
  employeeIds: number[];
  bonusHours: number;
  year: number;
}

export interface CreateLeaveBalanceBonusResult {
  employeeId: number;
  status: string;
  previousTotal: number;
  newTotal: number;
  bonusAdded: number;
}

export interface CreateLeaveBalanceBonusResponse {
  year: number;
  bonusHours: number;
  processed: number;
  results: CreateLeaveBalanceBonusResult[];
}

export interface CreateLeaveRequests {
  startDate: string;
  endDate: string;
  isFullDay?: boolean;
  startTime?: string;
  endTime?: string;
  leaveType?: string;
  reason?: string;
}
export interface CreateLeaveResponse {
  id?: number;
  employeeId?: number;
  leaveType?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  isFullDay?: boolean;
  totalHours?: number;
  reason?: string;
  status?: string;
  approverId?: number;
  approvedAt?: string;
  rejectedAt?: string;
  rejectedReason?: string;
  isAutoApproved?: boolean;
  cancelReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
  employee?: Employee;
  approver?: Employee;
}
export interface LeaveByType {
  leaveType?: string;
  totalHours?: number;
  usedHours?: number;
  remainingHours?: number;
}

export interface Leave {
  id: number;
  employeeId?: number;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  isFullDay?: boolean;
  totalHours?: number;
  reason?: string;
  status?: string;
  approverId?: number;
  approvedAt?: string;
  rejectedAt?: string;
  rejectedReason?: string;
  isAutoApproved?: boolean;
  cancelReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
  employee?: Employee;
  approver?: Employee;
}
export interface GetLeaveRequest {
  page: number;
  limit: number;
  status?: string;
  leaveType?: string;
  employeeId?: number;
  fromDate?: string;
  toDate?: string;
}
export interface GetLeaveResponse {
  data: Leave[];
  meta: IMeta;
}
