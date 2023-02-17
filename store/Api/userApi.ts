import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['user', 'boards'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
  endpoints: (builder) => ({
    getUserByUID: builder.query({
      query: (uid) => `?uid=${uid}`,
      providesTags: ['user'],
    }),
  }),
});

export const { useGetUserByUIDQuery } = userApi;
