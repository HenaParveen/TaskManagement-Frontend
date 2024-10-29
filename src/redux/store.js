import { configureStore } from "@reduxjs/toolkit";
import userTaskReducers from "./features/userTask/userTaskSlice";

export const store = configureStore({
  reducer: {
    userTask: userTaskReducers,
  },
});
