import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "../types/user";

interface ProfileState {
  profile: UserProfile;
}

const initialState: ProfileState = {
  profile: {
    numComments: 0,
    numReviews: 0,
    userInfo: {
      _id: "",
      loggedIn: false,
      username: "",
      role: null,
      banned: false,
    },
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<UserProfile>) => {
      state.profile = { ...action.payload };
      return state;
    },
  },
});

export const { find } = profileSlice.actions;

export default profileSlice.reducer;
