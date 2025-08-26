import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation({
      query: ({ userId, updatedData }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useEditUserMutation } = userApi;
