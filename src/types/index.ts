import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export type {
  IRegisterRequest,
  IRegisterResponse,
  ISendOTPRequest,
  IVerifyOTPRequest,
  ILoginRequest,
  ILoginResponse,
  IChangePasswordRequest,
  IForgetPasswordRequest,
  IResetPasswordRequest,
} from "./auth.type";

export type { IContactRequest, IContactResponse } from "./constact.type";

export type { IErrorResponse } from "./error.type";

export type TRole = "ADMIN" | "USER" | "AGENT";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  icon: LucideIcon;
  title: string;
  url: string;
  component: ComponentType;
}
