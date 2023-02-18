import { IBoard, IColumn } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['boards', 'tasks', 'board'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/boards' }),
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
      query: (boardId) => `/${boardId}`,
      providesTags: ['board', 'tasks'],
    }),
    getBoardsByUID: builder.query({
      query: (uid) => `?uid=${uid}`,
      providesTags: ['boards'],
    }),
    createNewBoard: builder.mutation({
      query: ({ uid, board }) => ({
        url: `?uid=${uid}`,
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['boards'],
    }),
    createNewColumn: builder.mutation({
      query: ({ boardId, column }) => ({
        url: `/${boardId}`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['boards'],
    }),
    removeColumns: builder.mutation({
      query: ({ boardId, columnId }) => ({
        url: `/${boardId}/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['boards'],
    }),
    removeBoard: builder.mutation({
      query: (boardId) => ({
        url: `/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['boards'],
    }),
  }),
});

export const {
  useGetTemplateBoardQuery,
  useGetBoardByIdQuery,
  useGetBoardsByUIDQuery,
  useCreateNewBoardMutation,
  useCreateNewColumnMutation,
  useRemoveBoardMutation,
  useRemoveColumnsMutation,
} = boardApi;
