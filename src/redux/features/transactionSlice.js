import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionType: null,
  transactionEditData:{},
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    storeTranssactionType: (state, action) => {
      state.transactionType = action.payload;
    },
    storeTransactionEditData: (state, action) => {
      state.transactionEditData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeTransactionEditData,storeTranssactionType } = transactionSlice.actions;

export default transactionSlice.reducer;