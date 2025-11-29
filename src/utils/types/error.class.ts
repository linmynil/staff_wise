export class StaffWiseAppAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StaffWiseAppAPIError';
  }
}

export class StaffWiseAppCrashError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StaffWiseAppCrashError';
  }
}

export class StaffWiseAppGeneralError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StaffWiseAppGeneralError';
  }
}

export class StaffWiseAppGeneralTrackingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StaffWiseAppGeneralTrackingError';
  }
}
