import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "./appSlice";
export default configureStore({
  reducer: {
    main: mainReducer,
  },
});
