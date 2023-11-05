import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Review } from "../types/review";

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<Review>) => {
      state.reviews = [action.payload];
    },
    findHome: (state, action: PayloadAction<Review[]>) => {
      state.reviews = [...action.payload];
    },
    findUser: (state, action: PayloadAction<Review[]>) => {
      state.reviews = [...action.payload];
    },
    findAlbum: (state, action: PayloadAction<Review[]>) => {
      state.reviews = [...action.payload];
    },
    // TODO: change this when backend is connected
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: (state, action: PayloadAction<Review>) => {
      // state.reviews = [...state.reviews, action.payload];
    },
  },
});

export const { find, findHome, findUser, findAlbum, create } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
