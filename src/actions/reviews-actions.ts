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
} from "../reducers/reviews-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { UserReview } from "../components/review/review-form";
import { PageInfo } from "../types/pagination";

export const findReviewAction = async (
  dispatch: AppDispatch,
  reviewId: string,
  albumId: string
) => {
  if (!reviewId || !albumId) return;
  const review = await findReview(reviewId, albumId);
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
  const reviews = await findAlbumReviews(albumId, pageInfo);
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
  const reviews = await findUserReviews(userId, pageInfo);
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
  const newReview = await createReview(review, albumId);
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
  const editedReview = await editReview(review, albumId, reviewId);
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
  const removedReview = await removeReview(albumId, reviewId);
  if (!removedReview) return;
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
  const likedReview = await likeReview(albumId, reviewId);
  if (!likedReview) return;
  dispatch({
    type: like,
    payload: { review: likedReview, userId: userId },
  });
};
