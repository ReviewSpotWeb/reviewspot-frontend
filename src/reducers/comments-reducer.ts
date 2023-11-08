import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment, CommentList } from "../types/comment";
import { PaginationInfo } from "../types/pagination";
interface CommentState {
  comments: Comment[];
  paginationInfo: PaginationInfo;
}

const initialState: CommentState = {
  comments: [],
  paginationInfo: {
    next: null,
    prev: null,
    // TODO: get these from constants
    page: { offset: 0, limit: 10 },
    total: 0,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    findComments: (state, action: PayloadAction<CommentList>) => {
      state = {
        comments: [...action.payload.comments],
        paginationInfo: {
          page: { limit: action.payload.limit, offset: action.payload.offset },
          next: action.payload.next,
          prev: action.payload.prev,
          total: action.payload.total,
        },
      };
      return state;
    },
    create: (state, action: PayloadAction<Comment>) => {
      state = {
        ...state,
        comments: [action.payload, ...state.comments],
      };
      return state;
    },
    remove: (state, action: PayloadAction<string>) => {
      const updateComments = [...state.comments].filter(
        (comment) => comment._id !== action.payload
      );
      state = {
        ...state,
        comments: [...updateComments],
      };
      return state;
    },
  },
});

export const { findComments, create, remove } = commentsSlice.actions;

export default commentsSlice.reducer;
