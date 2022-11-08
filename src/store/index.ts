import { configureStore } from "@reduxjs/toolkit";

import timeCounterReducer from './timeCounterSlice';


export const store = configureStore({
  reducer: {
    timeCounter: timeCounterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
