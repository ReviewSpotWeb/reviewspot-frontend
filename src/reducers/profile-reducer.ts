import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";

interface ProfileState {
  user: User;
}

const initialState: ProfileState = {
  user: { _id: "", loggedIn: false, username: "", role: null, banned: false },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
    },
  },
});

export const { find } = profileSlice.actions;

export default profileSlice.reducer;
