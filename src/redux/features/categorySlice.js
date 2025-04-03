import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories:{},
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeCategories } = categorySlice.actions;

export default categorySlice.reducer;