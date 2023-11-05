import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumItemMobile from "./album-item-mobile";
import { Review } from "../../types/review";
import ReviewList from "../review/review-list";
import { WriteOrEditReviewIcon } from "../util/icons";
import { findAlbumAction } from "../../actions/albums-actions";
import { AppDispatch } from "../util/redux/store";
import { useAppDispatch, useAppSelector } from "../util/redux/hooks";
import AlbumList from "./album-list";
import { findAlbumReviewsAction } from "../../actions/reviews-actions";
import { loginToast } from "../../helpers/auth-helpers";

const AlbumPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { albumId } = useParams();
  const album: Album = useAppSelector((state) => state.albums.albums[0]);
  const reviews: Review[] = useAppSelector((state) => state.reviews.reviews);

  const [otherReviews, setOtherReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);

  // TODO: Get from state
  const loggedIn = false;
  // TODO: Get user from state

  useEffect(() => {
    if (!loggedIn) {
      setOtherReviews(reviews);
      setUserReview(null);
      return;
    }
    // Get user review if it exists
    const activeUserReview: Review | undefined = reviews
      .filter(
        // TODO: replace "alice" with active username
        (review) => review.authorInfo.authorName.toLowerCase() === "alice"
      )
      .pop();
    // Remove it from rest of review list
    if (activeUserReview) {
      setUserReview({ ...activeUserReview });
      setOtherReviews([
        ...reviews.filter((review) => review._id !== activeUserReview._id),
      ]);
    }
  }, [loggedIn, reviews]);

  useEffect(() => {
    findAlbumAction(dispatch, albumId ?? "");
    findAlbumReviewsAction(dispatch, albumId ?? "");
  }, [albumId, dispatch, loggedIn]);

  const handleEditReview = () => {
    if (!loggedIn) {
      // Should never reach this
      loginToast("Login to edit your review", "top-center");
      return;
    }
    console.log("edit");
  };

  const handleWriteReview = () => {
    if (!loggedIn) {
      loginToast("Login to write a review", "top-center");
      return;
    }
    console.log("write");
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
              {userReview ? (
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
                <div
                  className="flex justify-center items-center gap-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 rounded py-1 font-bold text-lg"
                  onClick={() => handleWriteReview()}
                >
                  <div>Write a Review</div>
                  <WriteOrEditReviewIcon />
                </div>
              )}
            </div>
          </div>
          <div className="h-full w-full flex flex-col gap-2">
            <div className="text-center font-bold text-xl bg-green-500 rounded cursor-default">
              {reviews.length === 0
                ? "No Reviews"
                : reviews.length === 1
                ? "Review"
                : "Reviews"}
            </div>
            <ReviewList reviews={[...otherReviews]} />
          </div>
        </div>
      )}
    </div>
  );
};
export default AlbumPage;
