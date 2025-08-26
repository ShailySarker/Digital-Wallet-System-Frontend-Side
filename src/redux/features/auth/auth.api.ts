import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  IChangePasswordRequest,
  IForgetPasswordRequest,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResetPasswordRequest,
  ISendOTPRequest,
  IVerifyOTPRequest,
} from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<IRegisterResponse>, IRegisterRequest>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOTP: builder.mutation<IResponse<null>, ISendOTPRequest>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOTP: builder.mutation<IResponse<null>, IVerifyOTPRequest>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<IResponse<ILoginResponse>, ILoginRequest>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    myProfile: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: builder.mutation<IResponse<null>, IChangePasswordRequest>({
      query: (passwordInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        data: passwordInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    forgetPassword: builder.mutation<IResponse<null>, IForgetPasswordRequest>({
      query: (emailInfo) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: emailInfo,
      }),
    }),
    resetPassword: builder.mutation<IResponse<null>, IResetPasswordRequest>({
      query: (userInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLoginMutation,
  useMyProfileQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
