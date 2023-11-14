import { configureStore } from '@reduxjs/toolkit';
import UiSlice from './slices/UiSlice';
import dictionarySlice from './slices/dictionarySlice';
// ...
const store = configureStore({
  reducer: {
    ui: UiSlice,
    dictionary: dictionarySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
