import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags: ["WALLET", "USER"],
    }),
    deposit: builder.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
  }),
});

export const {useMyWalletQuery, useDepositMutation, useWithdrawMutation, useSendMoneyMutation } =
  walletApi;
