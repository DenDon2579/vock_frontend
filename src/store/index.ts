import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import userSlice from './slices/userSlice';
import { dictionaryApi } from 'services/DictionaryService';
import { userApi } from 'services/UserService';
// ...
const rootReducer = combineReducers({
  ui: uiSlice,
  user: userSlice,
  [dictionaryApi.reducerPath]: dictionaryApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dictionaryApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
