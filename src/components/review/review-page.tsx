import { useEffect } from "react";
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
import { findReviewCommentsAction } from "../../actions/comments-actions";
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

  return (
    <div className="h-max w-full">
      {!review ? (
        <div className="text-center">Looking for review...</div>
      ) : (
        <div className="h-full w-full flex flex-col gap-5">
          <ReviewList reviews={[{ ...review }]} />
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
