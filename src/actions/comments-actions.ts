import { findReview } from "../reducers/comments-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { findReviewComments } from "../services/comments-services";

export const findReviewCommentsAction = async (
  dispatch: AppDispatch,
  reviewId: string
) => {
  if (!reviewId) return;
  const comments = await findReviewComments(reviewId);
  dispatch({
    type: findReview,
    payload: comments,
  });
};
