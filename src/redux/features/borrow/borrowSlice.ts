import { baseApi } from "../../api/baseApi";
import type { BorrowPayload, BorrowCreateResponse, BorrowSummaryResponse } from "./borrow.types";


export const borrowApi = baseApi.injectEndpoints({
endpoints: (build) => ({
createBorrow: build.mutation<BorrowCreateResponse, BorrowPayload>({
query: (body) => ({ url: "/borrow", method: "POST", body }),
invalidatesTags: [{ type: "Books", id: "LIST" }, { type: "BorrowBooks", id: "SUMMARY" }],
}),
getBorrowSummary: build.query<BorrowSummaryResponse, void>({
query: () => "/borrow",
providesTags: [{ type: "BorrowBooks", id: "SUMMARY" }],
}),
}),
});


export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;