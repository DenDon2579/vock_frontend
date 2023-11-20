import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isAuth: boolean;
}

const initialState: IState = {
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
