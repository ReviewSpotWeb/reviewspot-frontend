import { Review } from "../../types/review";
import ReviewListItem from "./review-list-item";

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {reviews.length > 0 &&
        reviews.map((review, idx) => (
          <ReviewListItem review={review} key={idx} />
        ))}
    </ul>
  );
};
export default ReviewList;
