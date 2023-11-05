import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "../../types/review";
import ReviewList from "./review-list";
import CommentList from "../comment/comment-list";
import { Comment } from "../../types/comment";
import PaginationBar, { PaginationInfo } from "../util/pagination-bar";
import { findReviewAction } from "../../actions/reviews-actions";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../util/redux/hooks";
import {
  createCommentAction,
  findReviewCommentsAction,
} from "../../actions/comments-actions";
import { WriteOrEditReviewIcon } from "../util/icons";
import { loginToast } from "../../helpers/auth-helpers";
import CommentForm from "../comment/comment-form";
const ReviewPage = () => {
  const { reviewId } = useParams();
  // TODO: Handling undefined useParams

  const prev = true; // If previous page
  const next = true; // If next page

  const loadNext = () => {
    console.log("next on profile page");
    return;
  };
  const loadPrev = () => {
    console.log("prev on profile page");
    return;
  };
  const paginationInfo: PaginationInfo = {
    prev,
    next,
    loadNext,
    loadPrev,
  };

  const dispatch: AppDispatch = useDispatch();
  const review: Review = useAppSelector((state) => state.reviews.reviews[0]);
  useEffect(() => {
    findReviewAction(dispatch, reviewId ?? "");
  }, [reviewId, dispatch]);

  const comments: Comment[] = useAppSelector(
    (state) => state.comments.comments
  );
  useEffect(() => {
    findReviewCommentsAction(dispatch, reviewId ?? "");
  }, [reviewId, dispatch]);
  const numComments: number = comments.length;

  const PAGE_SIZE = 10;

  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  // TODO: Get from state
  const loggedIn = 1;

  const handleWriteComment = () => {
    if (!loggedIn) {
      loginToast("Login to leave a comment", "top-center");
      return;
    }
    setShowCommentForm((prev) => !prev);
  };

  const onSave = (comment: string) => {
    setShowCommentForm((prev) => !prev);
    createCommentAction(dispatch, comment);
    // TODO: component should rerender and display user review
    // TODO: Do i need to update state or can i just force rerender
  };

  return (
    <div className="h-max w-full">
      {!review ? (
        <div className="text-center">Looking for review...</div>
      ) : (
        <div className="h-full w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <ReviewList reviews={[{ ...review }]} />
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
            <CommentList comments={[...comments]} />
            {comments.length > PAGE_SIZE && (
              <PaginationBar paginationInfo={paginationInfo} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewPage;
