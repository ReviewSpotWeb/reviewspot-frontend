import { AppDispatch } from "../components/util/redux/store";
import { find, like } from "../reducers/popular-reviews-reducer";
import { findHomeReviews, likeReview } from "../services/reviews-services";

export const findHomeReviewsAction = async (dispatch: AppDispatch) => {
  const reviews = await findHomeReviews();
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
  const likedReview = await likeReview(albumId, reviewId);
  if (!likedReview) return;
  dispatch({
    type: like,
    payload: { review: likedReview, userId: userId },
  });
};
