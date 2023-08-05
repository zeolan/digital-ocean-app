import { createSlice } from "@reduxjs/toolkit";

import { Mode, IVerb } from "../types.ts";

interface MainState {
  verb: IVerb | null;
  showTooltip: Boolean;
  showConjugation: Boolean;
  verbsOrder: number[];
  verbsOrderSorted: number[];
  verbIdx: number | null;
  numberOfVerbs: number;
  mode: string;
  sortVerbs: boolean;
}

const mode = localStorage.getItem("mode") || Mode.light;

const initialState: MainState = {
  verb: null,
  showTooltip: true,
  showConjugation: false,
  verbsOrder: [],
  verbsOrderSorted: [],
  verbIdx: 0,
  numberOfVerbs: 0,
  mode,
  sortVerbs: false,
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
    setVerbsOrderSorted: (state, action) => {
      state.verbsOrderSorted = action.payload;
    },
    setVerbIdx: (state, action) => {
      state.verbIdx = action.payload;
    },
    setNumberOfVerbs: (state, action) => {
      state.numberOfVerbs = action.payload;
    },
    setSortVerbs: (state, action) => {
      state.sortVerbs = action.payload;
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
  setSortVerbs,
  setVerbsOrderSorted,
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

export const getVerbsOrderSorted = (state): number[] => {
  return state.main.verbsOrderSorted;
};

export const getVerbIdx = (state): number => {
  return state.main.verbIdx;
};

export const getNumberOfVerbs = (state): number => {
  return state.main.numberOfVerbs;
};

export const getSortVerbs = (state): boolean => {
  return state.main.sortVerbs;
};

export default mainSlice.reducer;
