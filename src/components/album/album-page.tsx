import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumItemMobile from "./album-item-mobile";
import { Review } from "../../types/review";
import ReviewList from "../review/review-list";
import { WriteOrEditReviewIcon } from "../util/icons";
import { AppDispatch } from "../util/redux/store";
import { useAppDispatch, useAppSelector } from "../util/redux/hooks";
import AlbumList from "./album-list";
import {
  createReviewAction,
  editReviewAction,
  findAlbumReviewsAction,
} from "../../actions/reviews-actions";
import ReviewForm, { UserReview } from "../review/review-form";
import { showToastMessage } from "../../helpers/toast-helpers";

const AlbumPage = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const album = useLoaderData() as Album;
  const albumId = album.id;

  const reviewState = useAppSelector((state) => state.reviews);
  const { reviews, paginationInfo } = reviewState;

  const [otherReviews, setOtherReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);

  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);

  const loggedIn = useAppSelector((state) => state.user.user.loggedIn);
  const activeUsername = useAppSelector((state) => state.user.user.username);

  useEffect(() => {
    if (!loggedIn) {
      setOtherReviews(reviews);
      setUserReview(null);
      return;
    }
    // Get user review if it exists
    const activeUserReview: Review | undefined = reviews
      .filter(
        (review) =>
          review.authorInfo.authorName.toLowerCase() === activeUsername
      )
      .pop();
    // Remove it from rest of review list
    if (activeUserReview) {
      setUserReview({ ...activeUserReview });
      setOtherReviews([
        ...reviews.filter((review) => review._id !== activeUserReview._id),
      ]);
    } else {
      setUserReview(null);
      setOtherReviews(reviews);
    }
  }, [activeUsername, loggedIn, reviews]);

  useEffect(() => {
    findAlbumReviewsAction(dispatch, albumId ?? "");
  }, [albumId, dispatch, loggedIn]);

  const handleEditReview = () => {
    if (!loggedIn) {
      // Should never reach this
      showToastMessage({
        message: "Login to edit your review",
        position: "top-center",
      });
      return;
    }
    setShowReviewForm((prev) => !prev);
  };

  const handleWriteReview = () => {
    if (!loggedIn) {
      showToastMessage({
        message: "Login to write a review",
        position: "top-center",
      });
      return;
    }
    setShowReviewForm((prev) => !prev);
  };

  const onSave = (review: UserReview) => {
    setShowReviewForm((prev) => !prev);
    if (!albumId) return;
    if (userReview) {
      editReviewAction(dispatch, review, albumId, userReview._id);
    } else {
      createReviewAction(dispatch, review, albumId);
    }
  };

  return (
    <div className="h-max w-full">
      {!album ? (
        <div className="text-center">Loading album...</div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="rounded w-full h-full bg-[#404040] text-gray-300">
              <div className="sm:hidden">
                <AlbumItemMobile album={album} />
              </div>
              <div className="sm:block hidden">
                <AlbumList albums={[album]} />
              </div>
            </div>
            <div className="w-full h-full bg-[#404040] rounded">
              {userReview && !showReviewForm ? (
                <div>
                  <div className="p-2 pb-0 w-full flex justify-between items-center resize-none text-lg">
                    <div className="w-max px-5 text-center font-bold h-max bg-blue-600 rounded cursor-default">
                      Your Review
                    </div>
                    <div
                      className="px-5 flex justify-center items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded font-bold"
                      onClick={() => handleEditReview()}
                    >
                      <div>Edit</div>
                      <WriteOrEditReviewIcon />
                    </div>
                  </div>
                  <ReviewList reviews={[{ ...userReview }]} hideAuthorInfo />
                </div>
              ) : (
                <div>
                  {!showReviewForm && (
                    <div
                      className="flex justify-center items-center gap-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 rounded py-1 font-bold text-lg"
                      onClick={() => handleWriteReview()}
                    >
                      <div>Write a Review</div>
                      <WriteOrEditReviewIcon />
                    </div>
                  )}
                </div>
              )}
              {showReviewForm && (
                <div className="rounded p-1">
                  <ReviewForm
                    onSave={onSave}
                    review={userReview ?? null}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="h-full w-full flex flex-col gap-2">
            <div className="text-center font-bold text-xl bg-green-500 rounded cursor-default">
              {otherReviews.length === 0
                ? "No Other Reviews"
                : otherReviews.length === 1
                ? "Review"
                : "Reviews"}
            </div>
            <ReviewList
              reviews={[...otherReviews]}
              paginationInfo={paginationInfo}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default AlbumPage;
