import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const widgetsTitles = {
  learnButton: 'Обучение',
  addNewWord: 'Добавление слова',
  dropArea: 'Перенос',
  notifications: 'Уведомления',
};
type WidgetsTypes = 'learnButton' | 'addNewWord' | 'dropArea' | 'notifications';
interface IWidget {
  type: WidgetsTypes;
  title: string;
}
interface IState {
  multiTaskArea: {
    widgets: {
      activeWidgets: IWidget[];
      importantWidget: IWidget | null;
      focusOnImportant: boolean;
    };
  };
}

const initialState: IState = {
  multiTaskArea: {
    widgets: {
      activeWidgets: [
        { type: 'learnButton', title: widgetsTitles.learnButton },
      ],
      importantWidget: null,
      focusOnImportant: false,
    },
  },
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveWidgets(state, action: PayloadAction<IWidget[]>) {
      state.multiTaskArea.widgets.activeWidgets = action.payload;
    },
    activateWidget(state, action: PayloadAction<WidgetsTypes>) {
      if (
        !state.multiTaskArea.widgets.activeWidgets.includes({
          type: action.payload,
          title: widgetsTitles[action.payload],
        })
      ) {
        state.multiTaskArea.widgets.activeWidgets.push({
          type: action.payload,
          title: widgetsTitles[action.payload],
        });
      }
    },
    deactivateWidget(state, action: PayloadAction<WidgetsTypes>) {
      state.multiTaskArea.widgets.activeWidgets.filter(
        (i) => i.type !== action.payload
      );
    },
    activateImportantWidget(
      state,
      action: PayloadAction<[WidgetsTypes, boolean]>
    ) {
      state.multiTaskArea.widgets.importantWidget = {
        type: action.payload[0],
        title: widgetsTitles[action.payload[0]],
      };
      state.multiTaskArea.widgets.focusOnImportant = action.payload[1];
    },
    deactivateImportantWidget(state) {
      state.multiTaskArea.widgets.importantWidget = null;
      state.multiTaskArea.widgets.focusOnImportant = false;
    },
  },
});

export default UiSlice.reducer;
export const {
  setActiveWidgets,
  activateWidget,
  deactivateWidget,
  activateImportantWidget,
  deactivateImportantWidget,
} = UiSlice.actions;
