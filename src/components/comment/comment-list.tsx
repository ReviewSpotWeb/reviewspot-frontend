import { useDispatch } from "react-redux";
import { Comment } from "../../types/comment";
import { PaginationInfo } from "../../types/pagination";
import { AppDispatch } from "../util/redux/store";
import CommentListItem from "./comment-list-item";
import { findReviewCommentsAction } from "../../actions/comments-actions";
import { useParams } from "react-router-dom";
import PaginationBar from "../util/pagination-bar";
import { showToastMessage } from "../../helpers/toast-helpers";

type CommentListProps = {
  comments: Comment[];
  paginationInfo?: PaginationInfo;
};
const CommentList = (commentListProps: CommentListProps) => {
  const { comments, paginationInfo } = commentListProps;
  const { reviewId, albumId } = useParams();
  const prev = paginationInfo ? paginationInfo.prev : null; // If previous page
  const next = paginationInfo ? paginationInfo.next : null; // If next page
  const dispatch: AppDispatch = useDispatch();

  const loadNext = () => {
    if (!reviewId || !albumId) return;
    findReviewCommentsAction(
      dispatch,
      reviewId,
      albumId,
      next ?? undefined
    ).catch((error) => showToastMessage({ message: error.message }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const loadPrev = () => {
    if (!reviewId || !albumId) return;
    findReviewCommentsAction(
      dispatch,
      reviewId,
      albumId,
      prev ?? undefined
    ).catch((error) => showToastMessage({ message: error.message }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {comments.length > 0 &&
        comments.map((comment, idx) => (
          <CommentListItem comment={{ ...comment }} key={idx} />
        ))}
      {(next || prev) && (
        <div>
          <PaginationBar
            next={next}
            prev={prev}
            loadNext={loadNext}
            loadPrev={loadPrev}
          />
        </div>
      )}
    </ul>
  );
};
export default CommentList;
