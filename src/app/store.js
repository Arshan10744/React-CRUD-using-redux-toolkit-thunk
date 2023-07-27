import { configureStore } from "@reduxjs/toolkit";
import  userDetails  from "../features/userDetailsSlice";

export const store = configureStore({
  reducer: {
    app: userDetails,
  },
});