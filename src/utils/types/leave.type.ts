export interface GetLeaveSummaryResponse {
  balance: Balance;
  pendingRequests: number;
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
