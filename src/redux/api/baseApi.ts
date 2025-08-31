import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-2-tawny.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: ["Books", "BorrowBooks"],
});