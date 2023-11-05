import { useState } from "react";
import { showToastMessage } from "../../helpers/toast-helpers";
import { Review } from "../../types/review";

export type UserReview = {
  review: string;
  rating: number;
};

type ReviewFormProps = {
  onSave: (review: UserReview) => void;
  review: Review | null;
};

const ReviewForm = (reviewFormProps: ReviewFormProps) => {
  const { onSave, review } = reviewFormProps;
  const initialUserReview = review
    ? { review: review.content, rating: review.rating.rating }
    : {
        review: "",
        rating: 0,
      };
  const [userReview, setUserReview] = useState<UserReview>(initialUserReview);
  const handleSave = () => {
    if (!userReview.review.trim()) {
      showToastMessage({ message: "Your review is empty!" });
      return;
    }
    onSave(userReview);
  };

  return (
    <div className="flex justify-center h-max">
      <div className="w-3/4 h-max text-gray-200 flex flex-col gap-2">
        <div className="text-center font-bold text-2xl">Rate and Review</div>
        <div>
          <textarea
            name="review"
            id="review-text"
            className="resize-none px-2 py-1 w-full h-32 rounded bg-[#333] border-2 border-[#222]"
            onChange={(e) =>
              setUserReview({ ...userReview, review: e.target.value })
            }
            value={userReview.review}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            className="w-3/4 accent-blue-500"
            value={userReview.rating}
            onChange={(e) =>
              setUserReview({ ...userReview, rating: parseInt(e.target.value) })
            }
          />
          <div className="w-1/4 text-center font-bold">
            Rating: <span className="text-blue-500">{userReview.rating}</span>
          </div>
        </div>
        <div className="text-center">
          <button
            className="w-1/4 border-2 border-[#333] rounded font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReviewForm;
