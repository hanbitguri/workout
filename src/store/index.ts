import { reportSlice } from "./../slice/index";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
  reportSlice: reportSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
