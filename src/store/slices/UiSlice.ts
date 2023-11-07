import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const moduleTitles = {
  learnButton: 'Обучение',
  addNewWord: 'Добавление слова',
  dropArea: 'Перенос',
  notifications: 'Уведомления',
};
type ModulesTypes = 'learnButton' | 'addNewWord' | 'dropArea' | 'notifications';
interface IModule {
  type: ModulesTypes;
  title: string;
}
interface IState {
  multiTaskArea: {
    modules: {
      activeModules: IModule[];
      importantModule: IModule | null;
    };
  };
}

const initialState: IState = {
  multiTaskArea: {
    modules: {
      activeModules: [{ type: 'learnButton', title: moduleTitles.learnButton }],
      importantModule: null,
    },
  },
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveModules(state, action: PayloadAction<IModule[]>) {
      state.multiTaskArea.modules.activeModules = action.payload;
    },
    activateModule(state, action: PayloadAction<ModulesTypes>) {
      if (
        !state.multiTaskArea.modules.activeModules.includes({
          type: action.payload,
          title: moduleTitles[action.payload],
        })
      ) {
        state.multiTaskArea.modules.activeModules.push({
          type: action.payload,
          title: moduleTitles[action.payload],
        });
      }
    },
    deactivateModule(state, action: PayloadAction<ModulesTypes>) {
      state.multiTaskArea.modules.activeModules.filter(
        (i) => i.type !== action.payload
      );
    },
    activateImportantModule(state, action: PayloadAction<ModulesTypes>) {
      state.multiTaskArea.modules.importantModule = {
        type: action.payload,
        title: moduleTitles[action.payload],
      };
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
