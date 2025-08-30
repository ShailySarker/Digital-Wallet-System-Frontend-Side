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

export const { useMyTransactionQuery, useAllTransactionsQuery, useAgentStatsQuery } = transactionApi;
