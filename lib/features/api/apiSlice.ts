import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type data = {
  legal_status: string[][];
  business_description: string[][];
  sub_group_description: string[][];
  region: string[][];
  zone: string[][];
  woreda: string[][];
  kebele: string[][];
  site_id: string[][];
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getSuppliersOptions: builder.query<data, void>({
      query: () => "/api/choices/",
    }),
  }),
});

export const { useGetSuppliersOptionsQuery } = apiSlice;
