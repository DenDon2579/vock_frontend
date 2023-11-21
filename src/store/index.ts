import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import userSlice from './slices/userSlice';
import { dictionaryApi } from 'services/DictionaryService';
// ...
const rootReducer = combineReducers({
  ui: uiSlice,
  user: userSlice,
  [dictionaryApi.reducerPath]: dictionaryApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dictionaryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
