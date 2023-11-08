import { useDispatch } from "react-redux";
import { PaginationInfo } from "../../types/pagination";
import { Review } from "../../types/review";
import { AppDispatch } from "../util/redux/store";
import ReviewListItem from "./review-list-item";
import {
  findAlbumReviewsAction,
  findUserReviewsAction,
} from "../../actions/reviews-actions";
import { useParams } from "react-router-dom";
import PaginationBar from "../util/pagination-bar";
import { Album } from "../../types/album";
import { showToastMessage } from "../../helpers/toast-helpers";

type ReviewListProps = {
  reviews: Review[];
  hideAuthorInfo?: boolean;
  paginationInfo?: PaginationInfo;
  album?: Album;
};

const ReviewList = (reviewListProps: ReviewListProps) => {
  const { reviews, album, hideAuthorInfo, paginationInfo } = reviewListProps;
  const prev = paginationInfo ? paginationInfo.prev : null; // If previous page
  const next = paginationInfo ? paginationInfo.next : null; // If next page
  const dispatch: AppDispatch = useDispatch();

  const { albumId, userId } = useParams();
  const loadNext = () => {
    if (albumId)
      findAlbumReviewsAction(dispatch, albumId, next ?? undefined).catch(
        (error) => showToastMessage({ message: error.message })
      );
    else if (userId)
      findUserReviewsAction(dispatch, userId, next ?? undefined).catch(
        (error) => showToastMessage({ message: error.message })
      );
    else return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const loadPrev = () => {
    if (albumId)
      findAlbumReviewsAction(dispatch, albumId, prev ?? undefined).catch(
        (error) => showToastMessage({ message: error.message })
      );
    else if (userId)
      findUserReviewsAction(dispatch, userId, prev ?? undefined).catch(
        (error) => showToastMessage({ message: error.message })
      );
    else return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {reviews.length > 0 &&
        reviews.map((review, idx) => (
          <ReviewListItem
            review={{ ...review }}
            key={idx}
            hideAuthorInfo={hideAuthorInfo}
            album={album ?? undefined}
          />
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
export default ReviewList;
