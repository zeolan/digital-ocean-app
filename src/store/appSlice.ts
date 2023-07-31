import { createSlice } from "@reduxjs/toolkit";

import { Mode, IVerb } from "../types.ts";

interface MainState {
  verb: IVerb | null;
  showTooltip: Boolean;
  showConjugation: Boolean;
  verbsOrder: number[];
  verbIdx: number | null;
  numberOfVerbs: number;
  mode: string;
}

const mode = localStorage.getItem("mode") || Mode.light;

const initialState: MainState = {
  verb: null,
  showTooltip: true,
  showConjugation: false,
  verbsOrder: [],
  verbIdx: 0,
  numberOfVerbs: 0,
  mode,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
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
    setVerbsOrder: (state, action) => {
      state.verbsOrder = action.payload;
    },
    setVerbIdx: (state, action) => {
      state.verbIdx = action.payload;
    },
    setNumberOfVerbs: (state, action) => {
      state.numberOfVerbs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowTooltip,
  setShowConjugation,
  setVerb,
  setMode,
  setVerbsOrder,
  setVerbIdx,
  setNumberOfVerbs,
} = mainSlice.actions;

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

export const getVerbsOrder = (state): number[] => {
  return state.main.verbsOrder;
};

export const getVerbIdx = (state): number => {
  return state.main.verbIdx;
};

export const getNumberOfVerbs = (state): number => {
  return state.main.numberOfVerbs;
};

export default mainSlice.reducer;
