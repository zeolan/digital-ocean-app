import { createSlice } from "@reduxjs/toolkit";

import { Mode } from "../types.ts";

/*interface MainState {
  verb: IVerb | null;
  showTooltip: Boolean;
  showConjugation: Boolean;
}*/

const mode = localStorage.getItem("mode") || Mode.light;

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    verb: null,
    showTooltip: true,
    showConjugation: false,
    mode,
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
    setMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("mode", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowTooltip, setShowConjugation, setVerb, setMode } =
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

export const getMode = (state) => {
  return state.main.mode;
};

export default mainSlice.reducer;
