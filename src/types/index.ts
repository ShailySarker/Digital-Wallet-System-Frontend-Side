export type {
  IRegisterRequest,
  IRegisterResponse,
  ISendOTPRequest,
  IVerifyOTPRequest,
} from "./auth.type";

export type { IErrorResponse } from "./error.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
