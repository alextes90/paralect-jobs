import { configureStore } from "@reduxjs/toolkit";
import { errorSlice } from "./features/errorSlicer";
import { inputSlice } from "./features/inputSlice";

export const store = configureStore({
  reducer: {
    inputSlicer: inputSlice.reducer,
    errorSlicer: errorSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
