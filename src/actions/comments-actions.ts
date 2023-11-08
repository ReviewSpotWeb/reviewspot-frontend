import { create, findComments, remove } from "../reducers/comments-reducer";
import { AppDispatch } from "../components/util/redux/store";
import {
  createComment,
  findReviewComments,
  removeComment,
} from "../services/comments-services";
import { PageInfo } from "../types/pagination";

export const findReviewCommentsAction = async (
  dispatch: AppDispatch,
  reviewId: string,
  albumId: string,
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  if (!reviewId) return;
  const comments = await findReviewComments(reviewId, albumId, pageInfo);
  dispatch({
    type: findComments,
    payload: comments,
  });
};

export const createCommentAction = async (
  dispatch: AppDispatch,
  albumId: string,
  reviewId: string,
  comment: string
) => {
  if (!albumId || !reviewId || !comment || !comment.trim()) return;
  const newComment = await createComment(albumId, reviewId, comment);
  dispatch({
    type: create,
    payload: newComment,
  });
};

export const removeCommentAction = async (
  dispatch: AppDispatch,
  albumId: string,
  reviewId: string,
  commentId: string
) => {
  if (!albumId || !reviewId || !commentId) return;
  const removedComment = await removeComment(albumId, reviewId, commentId);
  if (!removedComment) return;
  dispatch({
    type: remove,
    payload: commentId,
  });
};
