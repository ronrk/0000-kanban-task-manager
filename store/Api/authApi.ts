import { IUser } from '@/types';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['User'],

  endpoints: (build) => ({
    register: build.mutation<{ token: string; user: IUser }, any>({
      query: (credentials: any) => ({
        url: '/auth?auth=register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation<{ token: string; user: IUser }, any>({
      query: (credentials: any) => ({
        url: '/auth?auth=login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
