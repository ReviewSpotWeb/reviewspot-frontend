import { create, findComments, remove } from "../reducers/comments-reducer";
import { AppDispatch } from "../components/util/redux/store";
import {
  createComment,
  findReviewComments,
  removeComment,
} from "../services/comments-services";
import { PageInfo } from "../types/pagination";
import { isErrorResponse } from "../services/axios";
import { Comment, CommentList } from "../types/comment";
import { decNumComments, incNumComments } from "../reducers/reviews-reducer";

export const findReviewCommentsAction = async (
  dispatch: AppDispatch,
  reviewId: string,
  albumId: string,
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  if (!reviewId) return;
  const res = await findReviewComments(reviewId, albumId, pageInfo);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const comments = res as CommentList;
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
  const res = await createComment(albumId, reviewId, comment);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const newComment = res as Comment;
  dispatch({
    type: create,
    payload: newComment,
  });
  dispatch({
    type: incNumComments,
    payload: reviewId,
  });
};

export const removeCommentAction = async (
  dispatch: AppDispatch,
  albumId: string,
  reviewId: string,
  commentId: string
) => {
  if (!albumId || !reviewId || !commentId) return;
  const res = await removeComment(albumId, reviewId, commentId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const removedComment = res as boolean;
  if (!removedComment)
    throw Error("An unexpected error occurred - comment was not deleted");
  dispatch({
    type: remove,
    payload: commentId,
  });
  dispatch({
    type: decNumComments,
    payload: reviewId,
  });
};
