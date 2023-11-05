import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModulesTypes = 'learnButton' | 'addNewWord' | 'dropArea' | 'notifications';

interface IState {
  multiTaskArea: {
    modules: {
      activeModules: ModulesTypes[];
      importantModule: ModulesTypes | null;
    };
  };
}

const initialState: IState = {
  multiTaskArea: {
    modules: {
      activeModules: ['learnButton'],
      importantModule: null,
    },
  },
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveModules(state, action: PayloadAction<ModulesTypes[]>) {
      state.multiTaskArea.modules.activeModules = action.payload;
    },
    activateModule(state, action: PayloadAction<ModulesTypes>) {
      if (!state.multiTaskArea.modules.activeModules.includes(action.payload)) {
        state.multiTaskArea.modules.activeModules.push(action.payload);
      }
    },
    deactivateModule(state, action: PayloadAction<ModulesTypes>) {
      state.multiTaskArea.modules.activeModules.filter(
        (i) => i !== action.payload
      );
    },
    activateImportantModule(state, action: PayloadAction<ModulesTypes>) {
      state.multiTaskArea.modules.importantModule = action.payload;
    },
    deactivateImportantModule(state) {
      state.multiTaskArea.modules.importantModule = null;
    },
  },
});

export default UiSlice.reducer;
export const {
  setActiveModules,
  activateModule,
  deactivateModule,
  activateImportantModule,
  deactivateImportantModule,
} = UiSlice.actions;
