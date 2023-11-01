import {
  findReview,
  findAlbumReviews,
  findHomeReviews,
  findUserReviews,
} from "../services/reviews-services";

import {
  find,
  findHome,
  findUser,
  findAlbum,
} from "../reducers/reviews-reducer";
import { AppDispatch } from "../components/util/redux/store";

export const findReviewAction = async (
  dispatch: AppDispatch,
  reviewId: string
) => {
  if (!reviewId) return;
  const review = await findReview(reviewId);
  dispatch({
    type: find,
    payload: review,
  });
};

export const findHomeReviewsAction = async (dispatch: AppDispatch) => {
  const reviews = await findHomeReviews();
  dispatch({
    type: findHome,
    payload: reviews,
  });
};

export const findAlbumReviewsAction = async (
  dispatch: AppDispatch,
  albumId: string
) => {
  const reviews = await findAlbumReviews(albumId);
  dispatch({
    type: findAlbum,
    payload: reviews,
  });
};

export const findUserReviewsAction = async (
  dispatch: AppDispatch,
  userId: string
) => {
  if (!userId) return;
  const reviews = await findUserReviews(userId);
  dispatch({
    type: findUser,
    payload: reviews,
  });
};
