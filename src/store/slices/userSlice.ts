import { createSlice } from '@reduxjs/toolkit';

interface IState {
  isAuth: boolean;
}

const initialState: IState = {
  isAuth: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
