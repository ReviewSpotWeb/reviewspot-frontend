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
    findReview: (state, action: PayloadAction<Comment[]>) => {
      state.comments = [...action.payload];
    },
  },
});

export const { findReview } = commentsSlice.actions;

export default commentsSlice.reducer;
