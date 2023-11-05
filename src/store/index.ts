import { configureStore } from '@reduxjs/toolkit';
import UiSlice from './slices/UiSlice';
// ...
const store = configureStore({
  reducer: {
    ui: UiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
