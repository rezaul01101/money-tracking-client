import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency:"৳",
  profilePicture: null,
  settingsInfo:null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    storeCurrency: (state, action) => {
      state.currency = action.payload;
    },
    storeSettingInfo: (state, action) => {
      state.settingsInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeCurrency,storeSettingInfo } = settingsSlice.actions;

export default settingsSlice.reducer;