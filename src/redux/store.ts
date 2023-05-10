import { configureStore } from "@reduxjs/toolkit";
import { inputSlice } from "./features/inputSlice";

export const store = configureStore({
  reducer: {
    inputSlicer: inputSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
