import { configureStore, compose } from "@reduxjs/toolkit";
//import { composeWithDevTools } from "@redux-devtools/extension";
import { composeWithDevTools } from "redux-devtools-extension";

import mainReducer from "./reducer.ts";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export default configureStore({
  reducer: {
    main: mainReducer,
  },
  composeEnhancers,
});
