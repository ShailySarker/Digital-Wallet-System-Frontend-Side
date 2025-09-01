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
    allCategoriesOfUser: builder.query({
      query: () => ({
        url: "/user/all-category-user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getSpecificUser: builder.query({
      query: (userInfo) => ({
        url: "/user/get-user",
        method: "GET",
        params: userInfo.toString(),
      }),
    }),
  }),
});

export const {
  useEditUserMutation,
  useAllCategoriesOfUserQuery,
  useGetSpecificUserQuery,
} = userApi;
