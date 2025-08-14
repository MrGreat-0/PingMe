import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, signup, logout, updateProfile } from "./authThunk";

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  // socket: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setSocket: (state, action) => {
    //   state.socket = action.payload;
    // },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.error = action.error.message;
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        state.error = action.error.message;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.error.message;
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.error = action.error.message;
      });
  },
});

export const {
  // setSocket,
  setOnlineUsers,
  setAuthUser,
  clearAuthError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
