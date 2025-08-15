import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";
import {
  getSocket,
  initSocket,
  disconnectSocket,
} from "../../services/socketService";

import {
  setOnlineUsers,
  setAuthUser,
  clearAuthError,
  resetAuthState,
} from "./authSlice";

const BASE_URL = import.meta.env.VITE_NODE_URL;

// Async thunks for API calls
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch }) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      dispatch(setAuthUser(res.data));
      dispatch(connectSocket());
      dispatch(clearAuthError());
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      dispatch(setAuthUser(res.data));
      dispatch(connectSocket());
      toast.success("Account created successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      dispatch(setAuthUser(res.data));
      dispatch(connectSocket());
      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(resetAuthState());
      disconnectSocket();
      dispatch(setSelectedUser(null));
      toast.success("Logged out successfully");
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { dispatch }) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      dispatch(setAuthUser(res.data));
      toast.success("Profile updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      throw error;
    }
  }
);

export const connectSocket = () => (dispatch, getState) => {
  try {
    const { authUser } = getState().auth;
    const socket = getSocket();

    if (!authUser || socket?.connected) return;

    // console.log("connectSocket _ authUser ID ---------- " + authUser._id);
    // console.log("BASE_URL:", BASE_URL);

    const newSocket = initSocket(BASE_URL, authUser._id);

    newSocket.connect();

    newSocket.off("getOnlineUsers");

    newSocket.on("getOnlineUsers", (userIds) => {
      // console.log("Socket connected 02:", newSocket.id);
      dispatch(setOnlineUsers(userIds));
    });
  } catch (error) {
    console.error("Socket initialization error:", error);
  }
};
