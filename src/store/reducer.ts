import { createSlice } from "@reduxjs/toolkit";

import { Mode, IVerb, Lang } from "../types.ts";
//import data from "../data_new.json";
import data from "../data.json";

interface MainState {
  verb: IVerb | null;
  verbs: IVerb[];
  showTooltip: Boolean;
  showConjugation: Boolean;
  verbsOrder: number[];
  verbsOrderSorted: number[];
  verbIdx: number | null;
  numberOfVerbs: number;
  mode: string;
  sortVerbs: boolean;
  fromLang: Lang;
}

const mode = localStorage.getItem("mode") || Mode.light;
const verbs = data as IVerb[];

const initialState: MainState = {
  verb: null,
  verbs: verbs,
  showTooltip: true,
  showConjugation: false,
  verbsOrder: [],
  verbsOrderSorted: [],
  verbIdx: 0,
  numberOfVerbs: 0,
  mode,
  sortVerbs: false,
  fromLang: Lang.ro,
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
    setFromLang: (state, action) => {
      state.fromLang = action.payload;
    },
  },
});

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
  setFromLang,
} = mainSlice.actions;

export const getVerb = (state): IVerb => {
  return state.main.verb;
};

export const getVerbs = (state): IVerb[] => {
  return state.main.verbs;
};

export const getShowTooltip = (state): boolean => {
  return state.main.showTooltip;
};

export const getShowConjugation = (state): boolean => {
  return state.main.showConjugation;
};

export const getMode = (state): string => {
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

export const getFromLang = (state): Lang => {
  return state.main.fromLang;
};

export default mainSlice.reducer;
