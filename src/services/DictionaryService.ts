import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpStatusCode } from 'axios';
import { ITranslation, IWord } from 'types/dictionary';

export const dictionaryApi = createApi({
  reducerPath: 'dictionaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/dictionary',
  }),
  endpoints: (build) => ({
    getWords: build.query<IWord[], number>({
      query: () => ({
        url: '/words',
        headers: {
          Authorization: localStorage.getItem('token')?.toString(),
        },
      }),
    }),
    translateWord: build.query<ITranslation[], string>({
      query: (word) => {
        return {
          url: '/translate',
          params: { word },
          headers: {
            Authorization: localStorage.getItem('token')?.toString(),
          },
        };
      },
    }),
    addWord: build.mutation<null, IWord>({
      query: (word) => {
        return {
          url: '/words',
          method: 'POST',
          body: word,
          headers: {
            Authorization: localStorage.getItem('token')?.toString(),
          },
        };
      },
    }),
  }),
});

export const { useGetWordsQuery, useTranslateWordQuery, useAddWordMutation } =
  dictionaryApi;
