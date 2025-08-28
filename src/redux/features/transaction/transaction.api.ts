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
  }),
});

export const { useMyTransactionQuery } = transactionApi;
