import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // add other reducers here
  },
});

export default store;
