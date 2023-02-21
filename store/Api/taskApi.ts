import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['tasks'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tasks' }),
  endpoints: (builder) => ({}),
});

export const {} = taskApi;
