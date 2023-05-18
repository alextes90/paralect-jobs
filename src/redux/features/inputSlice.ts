import { LOCAL_KEY, SALARY } from "@/constants/defaultVal";
import { createSlice } from "@reduxjs/toolkit";

let localKey = "";
if (typeof window !== "undefined") {
  localKey = localStorage.getItem(LOCAL_KEY) || "";
}

const initialState = {
  searchInput: { value: "" },
  category: "",
  salary: {
    amountForm: SALARY.amountForm,
    amountTill: SALARY.amountTill,
  },
  categories: [],
  token: localKey,
  resultData: { data: [], totalPage: 0 },
};

export const inputSlice = createSlice({
  name: "inputSlice",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSalary: (state, action) => {
      state.salary = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
  },
});

export const {
  setCategory,
  setSalary,
  setSearchInput,
  setCategories,
  setToken,
  setResultData,
} = inputSlice.actions;
