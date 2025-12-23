export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorAPI {
  status: number;
  data: {
    message: string;
    errorCode: string;
    timestamp: string;
  };
}
