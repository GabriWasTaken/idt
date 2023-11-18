import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoReducer";

export const store = configureStore({
  reducer: {
    video: videoSlice,
  },
});
