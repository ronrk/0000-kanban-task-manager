import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/tasks',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Tasks'],
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getTasksByColId: builder.query({
      query: (colId) => `/${colId}`,
      providesTags: ['Tasks'],
    }),

    createNewTask: builder.mutation({
      query: ({ colId, task }) => ({
        url: `/${colId}`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    changeTaskColumn: builder.mutation({
      query: ({ taskId, colId, newColId }) => ({
        url: `/${colId}`,
        method: 'PATCH',
        body: { newColId, taskId },
      }),
      invalidatesTags: ['Tasks'],
    }),
    changeSubtaskStatus: builder.mutation({
      query: ({ colId, taskId, subtaskId }) => ({
        url: `/${colId}/${taskId}/${subtaskId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks'],
    }),
    editTask: builder.mutation({
      query: ({ colId, task, subtasks, originalColumn }) => ({
        url: `/${colId}/${task._id}`,
        method: 'PATCH',
        body: { task, subtasks, originalColumn },
      }),
      invalidatesTags: ['Tasks'],
    }),
    removeSubtask: builder.mutation({
      query: ({ colId, taskId, subId }) => ({
        url: `/${colId}/${taskId}/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    removeTask: builder.mutation({
      query: ({ colId, taskId }) => ({
        url: `/${colId}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useCreateNewTaskMutation,
  useChangeTaskColumnMutation,
  useGetTasksByColIdQuery,
  useChangeSubtaskStatusMutation,
  useEditTaskMutation,
  useRemoveSubtaskMutation,
  useRemoveTaskMutation,
} = taskApi;
