import { configureStore, compose } from "@reduxjs/toolkit";
//import { composeWithDevTools } from "@redux-devtools/extension";
//import { composeWithDevTools } from "redux-devtools-extension";

import mainReducer from "./reducer.ts";

export default configureStore({
  reducer: {
    main: mainReducer,
  },
});

/*store.subscribe((state) => {
  console.log(state);
});*/
