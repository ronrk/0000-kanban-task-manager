import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['tasks'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tasks' }),
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (taskId: string) => `/${taskId}`,
      providesTags: ['tasks'],
    }),
    createNewTask: builder.mutation({
      query: (task) => ({
        url: '',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['tasks'],
    }),
    createNewSubtask: builder.mutation({
      query: ({ taskId, subtask }: { taskId: string; subtask: any }) => ({
        url: `/${taskId}`,
        method: 'POST',
        body: subtask,
      }),
      invalidatesTags: ['tasks'],
    }),
    removeTask: builder.mutation({
      query: (taskId) => ({
        url: `/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tasks'],
    }),
    removeSubtask: builder.mutation({
      query: ({
        taskId,
        subtaskId,
      }: {
        taskId: string;
        subtaskId: string;
      }) => ({ url: `/${taskId}/${subtaskId}`, method: 'DELETE' }),
      invalidatesTags: ['tasks'],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useCreateNewTaskMutation,
  useCreateNewSubtaskMutation,
  useRemoveTaskMutation,
  useRemoveSubtaskMutation,
} = taskApi;
