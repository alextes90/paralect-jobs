import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: "",
};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = errorSlice.actions;
