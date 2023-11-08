import {
  findReview,
  findAlbumReviews,
  findUserReviews,
  createReview,
  editReview,
  removeReview,
  likeReview,
} from "../services/reviews-services";

import {
  find,
  findUser,
  findAlbum,
  create,
  edit,
  remove,
  like,
  FoundReview,
} from "../reducers/reviews-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { UserReview } from "../components/review/review-form";
import { PageInfo } from "../types/pagination";
import { isErrorResponse } from "../services/axios";
import { Review, ReviewList } from "../types/review";

export const findReviewAction = async (
  dispatch: AppDispatch,
  reviewId: string,
  albumId: string
) => {
  if (!reviewId || !albumId) return;
  const res = await findReview(reviewId, albumId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const review = res as FoundReview;
  dispatch({
    type: find,
    payload: review,
  });
};

export const findAlbumReviewsAction = async (
  dispatch: AppDispatch,
  albumId: string,
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  const res = await findAlbumReviews(albumId, pageInfo);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const reviews = res as ReviewList;
  dispatch({
    type: findAlbum,
    payload: reviews,
  });
};

export const findUserReviewsAction = async (
  dispatch: AppDispatch,
  userId: string,
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  if (!userId) return;
  const res = await findUserReviews(userId, pageInfo);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const reviews = res as ReviewList;
  dispatch({
    type: findUser,
    payload: reviews,
  });
};

export const createReviewAction = async (
  dispatch: AppDispatch,
  review: UserReview,
  albumId: string
) => {
  if (!review || !albumId) return;
  const res = await createReview(review, albumId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const newReview = res as Review;
  dispatch({
    type: create,
    payload: newReview,
  });
};

export const editReviewAction = async (
  dispatch: AppDispatch,
  review: UserReview,
  albumId: string,
  reviewId: string
) => {
  if (!review || !reviewId || !albumId) return;
  const res = await editReview(review, albumId, reviewId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const editedReview = res as Review;
  dispatch({
    type: edit,
    payload: editedReview,
  });
};

export const removeReviewAction = async (
  dispatch: AppDispatch,
  albumId: string,
  reviewId: string
) => {
  if (!reviewId || !albumId) return;
  const res = await removeReview(albumId, reviewId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const removedReview = res as boolean;
  if (!removedReview) throw Error("An unexpected error occurred");
  dispatch({
    type: remove,
    payload: reviewId,
  });
};

export const likeReviewAction = async (
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
