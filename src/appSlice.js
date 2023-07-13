import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    showTooltip: false,
  },
  reducers: {
    setShowTooltip: (state, action) => {
      state.showTooltip = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowTooltip } = mainSlice.actions;

export default mainSlice.reducer;
