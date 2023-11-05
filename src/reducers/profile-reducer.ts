import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role, User } from "../types/user";

interface ProfileState {
  user: User;
}

const initialState: ProfileState = {
  user: { username: "", role: Role.GENERAL, banned: false },
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
