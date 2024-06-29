import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    signinSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem(
        "EpicEatExpressAccessToken",
        action.payload.token.accessToken
      );
      localStorage.setItem(
        "EpicEatExpressRefreshToken",
        action.payload.token.refreshToken
      );
    },
    signinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      localStorage.clear();
    },
  },
});

export const {
  loginStart,
  signupSuccess,
  signupFailure,
  signinSuccess,
  signinFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
