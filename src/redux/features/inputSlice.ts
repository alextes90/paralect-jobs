import { LOCAL_KEY, SALARY } from "@/constants/defaultVal";
import { createSlice } from "@reduxjs/toolkit";

interface Token {
  access_token: string;
  expires_in: number;
  ttl: number;
}

const initLocalToken = { access_token: "", expires_in: 0, ttl: 0 };

let localKey: Token = initLocalToken;
if (typeof window !== "undefined") {
  localKey = JSON.parse(
    localStorage.getItem(LOCAL_KEY) || JSON.stringify(initLocalToken)
  );
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
