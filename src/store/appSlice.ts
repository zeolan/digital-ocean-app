import { createSlice } from "@reduxjs/toolkit";

import { IVerb } from "../types";

interface MainState {
  verb: IVerb | null;
  showTooltip: Boolean;
  showConjugation: Boolean;
}

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    verb: null,
    showTooltip: true,
    showConjugation: false,
  },
  reducers: {
    setShowTooltip: (state, action) => {
      state.showTooltip = action.payload;
    },
    setShowConjugation: (state, action) => {
      state.showConjugation = action.payload;
    },
    setVerb: (state, action) => {
      state.verb = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowTooltip, setShowConjugation, setVerb } =
  mainSlice.actions;

export const getVerb = (state) => {
  return state.main.verb;
};

export const getShowTooltip = (state) => {
  return state.main.showTooltip;
};

export const getShowConjugation = (state) => {
  return state.main.showConjugation;
};

export default mainSlice.reducer;
