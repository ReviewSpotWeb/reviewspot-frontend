import { PopularReview } from "../../types/review";
import PopularReviewListItem from "./popular-review-list-item";

type PopularReviewListProps = {
  popularReviews: PopularReview[];
};

const PopularReviewList = (popularReviewListProps: PopularReviewListProps) => {
  const { popularReviews } = popularReviewListProps;

  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {popularReviews.length > 0 &&
        popularReviews.map((popularReview, idx) => (
          <PopularReviewListItem
            review={{ ...popularReview.review }}
            album={{ ...popularReview.album }}
            key={idx}
          />
        ))}
    </ul>
  );
};
export default PopularReviewList;
