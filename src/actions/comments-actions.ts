import { create, findComments } from "../reducers/comments-reducer";
import { AppDispatch } from "../components/util/redux/store";
import {
  createComment,
  findReviewComments,
} from "../services/comments-services";

export const findReviewCommentsAction = async (
  dispatch: AppDispatch,
  reviewId: string
) => {
  if (!reviewId) return;
  const comments = await findReviewComments(reviewId);
  dispatch({
    type: findComments,
    payload: comments,
  });
};

export const createCommentAction = async (
  dispatch: AppDispatch,
  comment: string
) => {
  if (!comment || !comment.trim()) return;
  const newComment = await createComment(comment);
  dispatch({
    type: create,
    payload: newComment,
  });
};
