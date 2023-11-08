import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PopularReview, Review } from "../types/review";

interface PopularReviewState {
  popularReviews: PopularReview[];
}

const initialState: PopularReviewState = {
  popularReviews: [],
};

export const popularReviewsSlice = createSlice({
  name: "popularReviews",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<PopularReview[]>) => {
      state.popularReviews = [...action.payload];
      return state;
    },
    like: (
      state,
      action: PayloadAction<{ review: Review; userId: string }>
    ) => {
      const { review: likedReview, userId } = action.payload;
      const updatedReviews = state.popularReviews.map((popReview) => {
        const { review } = popReview;
        if (review._id !== likedReview._id) return popReview;
        let newLikedBy = [];
        if (review.likedBy.includes(userId))
          newLikedBy = review.likedBy.filter((uId) => uId !== userId);
        else newLikedBy = [...review.likedBy, userId];
        return {
          ...popReview,
          review: { ...review, likedBy: [...newLikedBy] },
        };
      });
      state = {
        ...state,
        popularReviews: [...updatedReviews],
      };
      return state;
    },
  },
});

export const { find, like } = popularReviewsSlice.actions;

export default popularReviewsSlice.reducer;
