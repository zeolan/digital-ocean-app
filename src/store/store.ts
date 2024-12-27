import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import mainReducer from "./reducer.ts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["showTermsOfUse", "fromLang", "mode"],
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const store = configureStore({
  reducer: {
    main: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This turn off console.error and console.warm about serialization
      // serializableCheck: {
      //   ignoredPaths: ["main.verbs", "verbs", "main.verb"],
      // },
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppTestStore = ReturnType<typeof setupTestStore>;

export default {
  store,
  persistor: persistStore(store),
};

// Test
const rootReducer = combineReducers({
  main: persistedReducer,
});

export function setupTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
