import type { ErrorResponse } from './services.types';

export interface DataResponse<T> {
  message: string
  flag: boolean
  error: ErrorResponse
  data: T
}
