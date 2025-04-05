import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency:"৳",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    storeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;