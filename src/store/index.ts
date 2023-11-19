import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import dictionarySlice from './slices/dictionarySlice';
import userSlice from './slices/userSlice';
// ...
const store = configureStore({
  reducer: {
    ui: uiSlice,
    dictionary: dictionarySlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
