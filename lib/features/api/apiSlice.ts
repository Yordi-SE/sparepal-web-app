import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getSuppliersOptions: builder.query<any, void>({
      query: () => "/api/choices/",
    }),
    getJob: builder.query<any, string>({
      query: (jobid) => `/opportunities/${jobid}`,
    }),
  }),
});

export const { useGetSuppliersOptionsQuery, useGetJobQuery } = apiSlice;
