import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role, User } from "../types/user";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: { username: "", role: Role.GENERAL, banned: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
    },
  },
});

export const { find } = userSlice.actions;

export default userSlice.reducer;
