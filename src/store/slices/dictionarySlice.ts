import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from 'types/dictionary';

interface IState {
  words: IWord[];
}

const initialState: IState = {
  words: [],
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setWords(state, action: PayloadAction<IWord[]>) {
      state.words = action.payload;
    },
  },
});

export default dictionarySlice.reducer;
export const { setWords } = dictionarySlice.actions;
