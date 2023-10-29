import { useParams } from "react-router-dom";
import reviewsJson from "../../data/reviews.json";
import commentsJson from "../../data/comments.json";
import { Review } from "../../types/review";
import ReviewList from "./review-list";
import CommentList from "../comment/comment-list";
import { Comment } from "../../types/comment";
import PaginationBar, { PaginationInfo } from "../util/pagination-bar";
const ReviewPage = () => {
  const { reviewId } = useParams();

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

  const reviews: Review[] = reviewsJson as never[];
  const review: Review = reviews.filter((review) => review._id === reviewId)[0];
  const comments: Comment[] = commentsJson.filter(
    (comment) => comment.reviewId === reviewId
  ) as never[];
  const numComments: number = comments.length;

  return (
    <div className="h-max w-full">
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
          <PaginationBar paginationInfo={paginationInfo} />
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;
