import { configureStore, compose } from "@reduxjs/toolkit";
//import { composeWithDevTools } from "@redux-devtools/extension";
//import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import mainReducer from "./reducer.ts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["showTermsOfUse", "fromLang", "mode"],
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

let store = configureStore({
  reducer: {
    main: persistedReducer,
  },
});

export default {
  store,
  persistor: persistStore(store),
};
