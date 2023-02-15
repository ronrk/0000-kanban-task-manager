import { formatBoards } from '@/lib/helpers';
import { IBoard, IColumn } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['boards'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/boards' }),
  endpoints: (builder) => ({
    getTemplateBoard: builder.query({
      forceRefetch(params) {
        return true;
      },
      query: (query) => query,
      transformResponse: (res: {
        initialBoard: IBoard;
        initialColumn: IColumn;
      }) => formatBoards(res),
    }),
    getAllBoards: builder.query({
      query: () => '/',
      providesTags: ['boards'],
    }),
    createNewBoard: builder.mutation({
      query: (board) => ({ url: '/', method: 'POST', body: board }),
      invalidatesTags: ['boards'],
    }),
    removeBoard: builder.mutation({
      query: (boardId: string) => ({ url: `/${boardId}`, method: 'DELETE' }),
      invalidatesTags: ['boards'],
    }),
  }),
});

export const {
  useGetTemplateBoardQuery,
  useGetAllBoardsQuery,
  useCreateNewBoardMutation,
  useRemoveBoardMutation,
} = boardApi;
