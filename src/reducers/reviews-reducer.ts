import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Review, ReviewList } from "../types/review";
import { PaginationInfo } from "../types/pagination";
import { Album } from "../types/album";

interface ReviewState {
  reviews: Review[];
  album: Album | null;
  paginationInfo: PaginationInfo;
}

const initialState: ReviewState = {
  reviews: [],
  album: null,
  paginationInfo: {
    next: null,
    prev: null,
    // TODO: get these from constants
    page: { offset: 0, limit: 10 },
    total: 0,
  },
};

export type FoundReview = {
  review: Review;
  albumData: Album;
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<FoundReview>) => {
      state = {
        ...initialState,
        reviews: [action.payload.review],
        album: action.payload.albumData,
      };
      return state;
    },
    findHome: (state, action: PayloadAction<Review[]>) => {
      state = {
        ...initialState,
        reviews: [...action.payload],
      };
      return state;
    },
    findUser: (state, action: PayloadAction<ReviewList>) => {
      state = {
        ...initialState,
        reviews: [...action.payload.reviews],
        paginationInfo: {
          page: { limit: action.payload.limit, offset: action.payload.offset },
          next: action.payload.next,
          prev: action.payload.prev,
          total: action.payload.total,
        },
      };
      return state;
    },
    findAlbum: (state, action: PayloadAction<ReviewList>) => {
      state = {
        ...initialState,
        reviews: [...action.payload.reviews],
        paginationInfo: {
          page: { limit: action.payload.limit, offset: action.payload.offset },
          next: action.payload.next,
          prev: action.payload.prev,
          total: action.payload.total,
        },
      };
      return state;
    },
    like: (
      state,
      action: PayloadAction<{ review: Review; userId: string }>
    ) => {
      const { review: likedReview, userId } = action.payload;
      const updatedReviews = state.reviews.map((review) => {
        if (review._id !== likedReview._id) return review;
        let newLikedBy = [];
        if (review.likedBy.includes(userId))
          newLikedBy = review.likedBy.filter((uId) => uId !== userId);
        else newLikedBy = [...review.likedBy, userId];
        return {
          ...review,
          likedBy: [...newLikedBy],
        };
      });
      state = {
        ...state,
        reviews: [...updatedReviews],
      };
      return state;
    },
    create: (state, action: PayloadAction<Review>) => {
      state = {
        ...state,
        reviews: [action.payload, ...state.reviews],
      };
      return state;
    },
    edit: (state, action: PayloadAction<Review>) => {
      const restReviews = state.reviews.filter(
        (review) => review._id !== action.payload._id
      );
      state = {
        ...state,
        reviews: [action.payload, ...restReviews],
      };
      return state;
    },
    remove: (state, action: PayloadAction<string>) => {
      const updatedReviews = [
        ...state.reviews.filter((review) => review._id !== action.payload),
      ];
      state = {
        ...state,
        reviews: [...updatedReviews],
      };
      return state;
    },
  },
});

export const {
  find,
  findHome,
  findUser,
  findAlbum,
  edit,
  create,
  remove,
  like,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
