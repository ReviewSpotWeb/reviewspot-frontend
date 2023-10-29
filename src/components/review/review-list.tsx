import { Review } from "../../types/review";
import ReviewListItem from "./review-list-item";

const ReviewList = ({
  reviews,
  hideAuthorInfo = false,
}: {
  reviews: Review[];
  hideAuthorInfo?: boolean;
}) => {
  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {reviews.length > 0 &&
        reviews.map((review, idx) => (
          <ReviewListItem
            review={{ ...review }}
            key={idx}
            hideAuthorInfo={hideAuthorInfo}
          />
        ))}
    </ul>
  );
};
export default ReviewList;
