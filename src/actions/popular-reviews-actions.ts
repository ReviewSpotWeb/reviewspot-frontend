import { AppDispatch } from "../components/util/redux/store";
import { find, like } from "../reducers/popular-reviews-reducer";
import { isErrorResponse } from "../services/axios";
import { findHomeReviews, likeReview } from "../services/reviews-services";
import { PopularReview, Review } from "../types/review";

export const findHomeReviewsAction = async (dispatch: AppDispatch) => {
  const res = await findHomeReviews();
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const reviews = res as PopularReview[];
  dispatch({
    type: find,
    payload: reviews,
  });
};

export const likePopularReviewAction = async (
  dispatch: AppDispatch,
  albumId: string,
  reviewId: string,
  userId: string
) => {
  if (!reviewId || !albumId) return;
  const res = await likeReview(albumId, reviewId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const likedReview = res as Review;
  dispatch({
    type: like,
    payload: { review: likedReview, userId: userId },
  });
};
