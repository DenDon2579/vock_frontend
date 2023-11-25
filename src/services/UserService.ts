import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from 'types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/user',
  }),
  endpoints: (build) => ({
    getUserData: build.query<IUser, null>({
      query: () => ({
        url: '/',
        headers: {
          Authorization: localStorage.getItem('token')?.toString(),
        },
      }),
    }),
    auth: build.query({
      query: () => ({
        url: '/auth',
        headers: {
          Authorization: localStorage.getItem('token')?.toString(),
        },
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useAuthQuery } = userApi;
