import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../types/comment";
interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    findComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = [...action.payload];
    },
    // TODO: Fix when server is connected
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: (state, action: PayloadAction<Comment>) => {
      // state.comments = [...state.comments, action.payload];
    },
  },
});

export const { findComments, create } = commentsSlice.actions;

export default commentsSlice.reducer;
