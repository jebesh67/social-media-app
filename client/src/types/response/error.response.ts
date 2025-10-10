export interface IApiError {
  success: boolean;
  message: string;
}

export interface IBackendError {
  message: string;
  error: string;
  statusCode: number;
}