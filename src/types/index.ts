import type { ComponentType } from "react";

export type {
  IRegisterRequest,
  IRegisterResponse,
  ISendOTPRequest,
  IVerifyOTPRequest,
  ILoginRequest,
  ILoginResponse,
} from "./auth.type";

export type { IErrorResponse } from "./error.type";

export type TRole = "ADMIN" | "USER" | "AGENT";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  url: string;
  component: ComponentType;
}
