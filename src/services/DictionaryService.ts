import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
        console.log(word);
        return {
          url: '/translate',
          params: { word },
          headers: {
            Authorization: localStorage.getItem('token')?.toString(),
          },
        };
      },
    }),
  }),
});

export const { useGetWordsQuery, useTranslateWordQuery } = dictionaryApi;
