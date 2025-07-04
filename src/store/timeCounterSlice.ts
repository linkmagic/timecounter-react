import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import { RootState } from './index';

import {
  TimeCounterID,
  TimeCounterIdName,
  TimeCounterItem,
  TimeCounterRunning,
  TimeCounterState
} from '../components/types/types';

import { getDateTimeStr } from '../utils/general';
import { saveAllDataToLS } from '../utils/localStorageRW';


const initialState: TimeCounterState = {
  list: []
};

export const timeCounterSlice = createSlice({
  name: "timeCounter",
  initialState,
  reducers: {
    saveDataToLS(state: TimeCounterState) {
      const listJson = JSON.parse(JSON.stringify(state.list));
      saveAllDataToLS(listJson);
    },
    loadAllData(state: TimeCounterState, action: PayloadAction<TimeCounterItem[]>) {
      state.list = action.payload;
    },
    addTimeCounter(state: TimeCounterState, action: PayloadAction<TimeCounterItem>) {
      state.list.push(action.payload);
      timeCounterSlice.caseReducers.saveDataToLS(state);
    },
    renameTimeCounter(state: TimeCounterState, action: PayloadAction<TimeCounterIdName>) {
      const index = state.list.findIndex(({ id }) => id === action.payload.id);
      if (index >= 0) {
        state.list[index].name = action.payload.name;
        timeCounterSlice.caseReducers.saveDataToLS(state);
      }
    },
    runningTimeCounter(state: TimeCounterState, action: PayloadAction<TimeCounterRunning>) {
      const index = state.list.findIndex(({ id }) => id === action.payload.id);
      if (index >= 0) {
        state.list[index].isRunning = action.payload.isRunning;
        if (action.payload.currentMilisStart) {
          state.list[index].currentMilisStart = action.payload.currentMilisStart;
          timeCounterSlice.caseReducers.saveDataToLS(state);
        }
        if (action.payload.currentMilisStop) {
          state.list[index].currentMilisStop = action.payload.currentMilisStop;
          state.list[index].totalSeconds += Math.floor((state.list[index].currentMilisStop - state.list[index].currentMilisStart) / 1000);
          state.list[index].history.push({
            start: getDateTimeStr(state.list[index].currentMilisStart),
            stop: getDateTimeStr(state.list[index].currentMilisStop),
          });
          state.list[index].currentMilisStart = 0;
          state.list[index].currentMilisStop = 0;
          timeCounterSlice.caseReducers.saveDataToLS(state);
        }
      }
    },
    removeTimeCounter(state: TimeCounterState, action: PayloadAction<TimeCounterID>) {
      const index = state.list.findIndex(({ id }) => id === action.payload.id);
      if (index >= 0) {
        state.list = state.list.filter((item) => item.id !== action.payload.id);
        timeCounterSlice.caseReducers.saveDataToLS(state);
      }
    },
    clearHistoryTimeCounter(state: TimeCounterState, action: PayloadAction<TimeCounterID>) {
      const index = state.list.findIndex(({ id }) => id === action.payload.id);
      if (index >= 0) {
        state.list[index].isRunning = false;
        state.list[index].totalSeconds = 0;
        state.list[index].currentMilisStart = 0;
        state.list[index].currentMilisStop = 0;
        state.list[index].history = [];
        timeCounterSlice.caseReducers.saveDataToLS(state);
      }
    },
  },
});

export const {
  saveDataToLS,
  loadAllData,
  addTimeCounter,
  renameTimeCounter,
  runningTimeCounter,
  removeTimeCounter,
  clearHistoryTimeCounter,
} = timeCounterSlice.actions;
export default timeCounterSlice.reducer;

export const selectTimeCountersList = (state: RootState) => state.timeCounter.list;
