import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myTransaction: builder.query({
      query: (params) => ({
        url: "/transaction/my-transactions",
        method: "GET",
        params
      }),
      providesTags: ["WALLET", "USER", "TRANSACTION"],
    }),
    myCommission: builder.query({
      query: (params) => ({
        url: "/transaction/commissions",
        method: "GET",
        params
      }),
      providesTags: ["WALLET", "USER", "TRANSACTION"],
    }),
    allTransactions: builder.query({
      query: (params) => ({
        url: "/transaction/all-transactions",
        method: "GET",
        params
      }),
      providesTags: ["WALLET", "USER", "TRANSACTION"],
    }),
    agentStats: builder.query({
      query: () => ({
        url: "/transaction/agent-stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useMyTransactionQuery, useMyCommissionQuery, useAllTransactionsQuery, useAgentStatsQuery } = transactionApi;
