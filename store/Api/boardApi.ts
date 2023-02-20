import { IBoard, IColumn } from '@/types';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/boards',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Boards', 'Board'],
  endpoints: (builder) => ({
    getTemplateBoard: builder.query({
      query: () => '?template=true',
      transformResponse: (data: {
        initialBoard: IBoard;
        initialColumn: IColumn;
      }) => ({ ...data.initialBoard, columns: [data.initialColumn] }),

      keepUnusedDataFor: 1,
    }),
    getBoardById: builder.query({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: ['Board'],
    }),
    getBoardsByUID: builder.query({
      query: (uid) => `?uid=${uid}`,
      providesTags: ['Boards'],
    }),
    createNewBoard: builder.mutation({
      query: ({ uid, board }) => ({
        url: `?uid=${uid}`,
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoardById: builder.mutation({
      query: (boardId) => ({
        url: `/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const {
  useCreateNewBoardMutation,
  useGetBoardByIdQuery,
  useGetBoardsByUIDQuery,
  useGetTemplateBoardQuery,
  useDeleteBoardByIdMutation,
} = boardApi;
