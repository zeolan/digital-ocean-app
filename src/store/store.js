import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "./appSlice.ts";

export default configureStore({
  reducer: {
    main: mainReducer,
  },
});
