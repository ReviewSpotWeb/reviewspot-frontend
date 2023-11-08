import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./review-list";
import CommentList from "../comment/comment-list";
import { findReviewAction } from "../../actions/reviews-actions";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../util/redux/hooks";
import {
  createCommentAction,
  findReviewCommentsAction,
} from "../../actions/comments-actions";
import { WriteOrEditReviewIcon } from "../util/icons";
import CommentForm from "../comment/comment-form";
import { showToastMessage } from "../../helpers/toast-helpers";
const ReviewPage = () => {
  const { reviewId, albumId } = useParams();

  const commentState = useAppSelector((state) => state.comments);
  const { comments, paginationInfo } = commentState;

  const dispatch: AppDispatch = useDispatch();
  const reviewState = useAppSelector((state) => state.reviews);
  const { reviews, album } = reviewState;
  const review = reviews[0];

  // TODO: use loader
  useEffect(() => {
    if (!reviewId || !albumId) return;
    findReviewAction(dispatch, reviewId, albumId);
  }, [reviewId, dispatch, albumId]);

  useEffect(() => {
    if (!reviewId || !albumId) return;
    findReviewCommentsAction(dispatch, reviewId, albumId);
  }, [reviewId, dispatch, albumId]);

  const [numComments, setNumComments] = useState<number>(0);

  useEffect(() => {
    setNumComments(comments.length);
  }, [comments]);

  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  const loggedIn = useAppSelector((state) => state.user.user.loggedIn);

  const handleWriteComment = () => {
    if (!loggedIn) {
      showToastMessage({
        message: "Login to leave a comment",
        position: "top-center",
      });
      return;
    }
    setShowCommentForm((prev) => !prev);
  };

  const onSave = (comment: string) => {
    setShowCommentForm((prev) => !prev);
    if (!reviewId || !albumId) return;
    createCommentAction(dispatch, albumId, reviewId, comment);
  };
  return (
    <div className="h-max w-full">
      {!review ? (
        <div className="text-center">Looking for review...</div>
      ) : (
        <div className="h-full w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <ReviewList reviews={[{ ...review }]} album={album ?? undefined} />
            <div className="w-full h-full bg-[#404040] rounded">
              {!showCommentForm && (
                <div
                  className="flex justify-center items-center gap-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 rounded py-1 font-bold text-lg"
                  onClick={() => handleWriteComment()}
                >
                  <div>Leave a Comment</div>
                  <WriteOrEditReviewIcon />
                </div>
              )}
              {showCommentForm && (
                <div className="rounded p-1">
                  <CommentForm
                    onSave={onSave}
                    onCancel={() => setShowCommentForm(false)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-max flex flex-col gap-2">
            <div className="text-center font-bold text-xl bg-green-500 rounded">
              {numComments === 0
                ? "No Comments"
                : numComments === 1
                ? "Comment"
                : "Comments"}
            </div>
            <CommentList
              comments={[...comments]}
              paginationInfo={paginationInfo}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewPage;
