import { IBoard, IColumn } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import mongoose from 'mongoose';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['boards', 'tasks'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/boards' }),
  endpoints: (builder) => ({
    getTemplateBoard: builder.query({
      query: () => '?template=true',
      transformResponse: (data: {
        initialBoard: IBoard;
        initialColumn: IColumn;
      }) => ({ ...data.initialBoard, columns: [data.initialColumn] }),
    }),
    getBoardById: builder.query({
      query: (boardId) => `?boardId=${boardId}`,
      providesTags: ['boards', 'tasks'],
    }),
    createNewBoard: builder.mutation({
      query: ({ uid, board }: { uid: string; board: any }) => ({
        url: `?uid=${uid}`,
        method: 'POST',
        body: board,
      }),

      invalidatesTags: ['boards'],
    }),
    createNewColumn: builder.mutation({
      query: ({ boardId, column }: { boardId: string; column: any }) => ({
        url: `/${boardId}`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['boards'],
    }),
    removeColumns: builder.mutation({
      query: ({
        boardId,
        columnId,
      }: {
        boardId: string;
        columnId: string;
      }) => ({
        url: `/${boardId}/${columnId}`,
        method: 'DELETE',
      }),
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
  useGetBoardByIdQuery,
  useCreateNewBoardMutation,
  useCreateNewColumnMutation,
  useRemoveBoardMutation,
  useRemoveColumnsMutation,
} = boardApi;
