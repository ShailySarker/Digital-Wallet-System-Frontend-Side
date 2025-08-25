import { baseApi } from "@/redux/baseApi";
import type { IContactRequest, IContactResponse, IResponse } from "@/types";

export const constactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    constactUs: builder.mutation<IResponse<IContactResponse>, IContactRequest>({
      query: (contactInfo) => ({
        url: "/contact/contact-with-us",
        method: "POST",
        data: contactInfo,
      }),
    }),
  }),
});

export const { useConstactUsMutation } = constactApi;
