import { baseApi } from "../../api/baseApi";
import type {
Book,
CreateBookPayload,
UpdateBookPayload,
PaginatedBooksResponse,
} from "./books.types";


export const booksApi = baseApi.injectEndpoints({
endpoints: (build) => ({
getBooks: build.query<
  PaginatedBooksResponse,
  { filter?: string; sortBy?: string; sort?: "asc" | "desc"; limit?: number } | void
>({
  query: (params) => {
    if (!params) {
      return { url: "/books" }; 
    }
    return { url: "/books", params }; 
  },
  providesTags: (result) =>
    result?.data
      ? [
          ...result.data.map(({ _id }) => ({ type: "Books" as const, id: _id })),
          { type: "Books" as const, id: "LIST" },
        ]
      : [{ type: "Books" as const, id: "LIST" }],
}),
getBookById: build.query<{ success: boolean; message: string; data: Book }, string>({
query: (id) => `/books/${id}`,
providesTags: (_res, _err, id) => [{ type: "Books", id }],
}),
createBook: build.mutation<{ success: boolean; message: string; data: Book }, CreateBookPayload>({
query: (body) => ({ url: "/books", method: "POST", body }),
invalidatesTags: [{ type: "Books", id: "LIST" }],
}),
updateBook: build.mutation<{ success: boolean; message: string; data: Book }, { id: string; body: UpdateBookPayload }>({
query: ({ id, body }) => ({ url: `/books/${id}`, method: "PUT", body }),
invalidatesTags: (_res, _err, { id }) => [{ type: "Books", id }, { type: "Books", id: "LIST" }],
}),
deleteBook: build.mutation<{ success: boolean; message: string; data: null }, string>({
query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),
invalidatesTags: [{ type: "Books", id: "LIST" }],
}),
}),
});


export const {
useGetBooksQuery,
useGetBookByIdQuery,
useCreateBookMutation,
useUpdateBookMutation,
useDeleteBookMutation,
} = booksApi;