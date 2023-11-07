import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { LoggedInResponse } from "../actions/user-actions";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: { _id: "", loggedIn: false, username: "", role: null, banned: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload, loggedIn: true };
    },
    logout: (state) => {
      state.user = { ...initialState.user };
    },
    register: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload, loggedIn: true };
    },
    // TODO: deleting account
    delete: (state) => {
      state.user = { ...initialState.user };
    },
    loggedIn: (state, action: PayloadAction<LoggedInResponse>) => {
      if (!action.payload.loggedIn) {
        state.user = { ...initialState.user };
        return;
      }
      if (!action.payload.userInfo) {
        state.user = { ...initialState.user };
        return;
      }
      // TODO: remove hard coded banned property when implemented
      state.user = {
        ...action.payload.userInfo,
        loggedIn: true,
        banned: false,
      };
    },
  },
});

export const { login, logout, register, loggedIn } = userSlice.actions;

export default userSlice.reducer;
