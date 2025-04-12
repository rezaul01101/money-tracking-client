import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo:{},
  otpInfo:null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    storeOtpInfo: (state, action) => {
      state.otpInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUserInfo,storeOtpInfo } = userSlice.actions;

export default userSlice.reducer;