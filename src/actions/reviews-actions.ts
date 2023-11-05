import {
  findReview,
  findAlbumReviews,
  findHomeReviews,
  findUserReviews,
  createReview,
  editReview,
} from "../services/reviews-services";

import {
  find,
  findHome,
  findUser,
  findAlbum,
  create,
  edit,
} from "../reducers/reviews-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { UserReview } from "../components/review/write-review-form";

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

// TODO: Only need this is if i want to manually update state
export const createReviewAction = async (
  dispatch: AppDispatch,
  review: UserReview,
  albumId: string
) => {
  if (!review || !albumId) return;
  const newReview = await createReview(review, albumId);
  dispatch({
    type: create,
    payload: newReview,
  });
};

export const editReviewAction = async (
  dispatch: AppDispatch,
  review: UserReview,
  reviewId: string,
  albumId: string
) => {
  if (!review || !reviewId || !albumId) return;
  const editedReview = await editReview(review, reviewId, albumId);
  dispatch({
    type: edit,
    payload: editedReview,
  });
};
