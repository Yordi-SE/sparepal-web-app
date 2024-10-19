import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    getJops: builder.query<any, void>({
      query: () => "/opportunities/search",
    }),
    getJob: builder.query<any, string>({
      query: (jobid) => `/opportunities/${jobid}`,
    }),
  }),
});

export const { useGetJopsQuery, useGetJobQuery } = apiSlice;
