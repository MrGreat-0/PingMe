import { createSlice } from "@reduxjs/toolkit";
import { getMessages, getUsers, sendMessage } from "./chatThunk";

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChatError: (state) => {
      state.error = null;
    },
    addNewUser: (state, action) => {
      const userExists = state.users.some(
        (user) => user._id === action.payload._id
      );
      if (!userExists) {
        state.users.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isUsersLoading = false;
        state.error = action.error.message;
      })
      // getMessages
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isMessagesLoading = false;
        state.error = action.error.message;
      })
      // sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // addNewUser
    // .addCase(fetchUserById.fulfilled, (state, action) => {
    //   const userExists = state.users.some(
    //     (user) => user._id === action.payload._id
    //   );
    //   if (!userExists) state.users.push(action.payload);
    // });
  },
});

export const { setSelectedUser, addMessage, clearChatError, addNewUser } =
  chatSlice.actions;

export default chatSlice.reducer;
