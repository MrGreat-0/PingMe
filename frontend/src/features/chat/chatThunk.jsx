import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "sonner";
import { addMessage, addNewUser } from "./chatSlice";
import { getSocket } from "../../services/socketService";

export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (_, { dispatch }) => {
    try {
      const res = await axiosInstance.get("/messages/users");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
      throw error;
    }
  }
);

// export const fetchUserById = createAsyncThunk(
//   "chat/fetchUserById",
//   async (userId, { dispatch }) => {
//     try {
//       const res = await axiosInstance.get(`/messages/user/${userId}`);
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch user");
//       throw error;
//     }
//   }
// );

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId, { dispatch }) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, { getState, dispatch }) => {
    try {
      const { selectedUser } = getState().chat;
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      dispatch(addMessage(res.data));
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      throw error;
    }
  }
);

export const subscribeToUsers = () => (dispatch) => {
  const socket = getSocket();
  if (!socket) return;

  socket.off("newUser");

  socket.on("newUser", (newUser) => {
    // console.log("Received newUser", newUser);
    dispatch(addNewUser(newUser));
  });
};

export const unsubscribeFromUsers = () => () => {
  const socket = getSocket();
  if (socket) {
    socket.off("newUser");
  }
};

export const subscribeToMessages = () => (dispatch, getState) => {
  try {
    const { selectedUser } = getState().chat;
    const socket = getSocket();

    if (!selectedUser || !socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;
      dispatch(addMessage(newMessage));

      // // Check if sender is a new user
      // const { users } = getState().chat;
      // const userExists = users.some((user) => user._id === newMessage.senderId);
      // console.log(userExists);

      // // update the users list for the sidebar when "receiver" receive msg (if sender's acc. is new)
      // if (!userExists && newMessage.senderId) {
      //   dispatch(fetchUserById(newMessage.senderId));
      // }

      // console.log("Subscribing...", { selectedUser, socket });
    });
  } catch (error) {
    console.error("Message subscription error:", error);
  }
};

export const unsubscribeFromMessages = () => () => {
  const socket = getSocket();
  if (socket) {
    socket.off("newMessage");
  }
};
