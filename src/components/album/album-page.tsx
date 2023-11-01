import { useEffect } from "react";
import { useParams } from "react-router-dom";
import reviewJson from "../../data/reviews.json";
import { Album } from "../../types/album";
import AlbumItemMobile from "./album-item-mobile";
import { Review } from "../../types/review";
import ReviewList from "../review/review-list";
import { WriteOrEditReviewIcon } from "../util/icons";
import { findAlbumAction } from "../../actions/albums-actions";
import { AppDispatch } from "../util/redux/store";
import { useAppDispatch, useAppSelector } from "../util/redux/hooks";
import AlbumList from "./album-list";

const AlbumPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { albumId } = useParams();
  const album: Album = useAppSelector((state) => state.albums.albums[0]);

  useEffect(() => {
    // TODO: Handle albumId being undefined
    findAlbumAction(dispatch, albumId ?? "");
  }, [albumId, dispatch]);

  // TODO: testing user review
  const albumReviews: Review[] =
    (reviewJson.filter((review) => review.albumId === albumId) as never[]) ??
    [];
  const USER_REVIEW: Review | undefined = albumReviews.pop();
  const numReviews = albumReviews.length;
  // TODO: Render more album info when on album page?
  // TODO: smaller image size here?

  const handleEditReview = () => {
    console.log("edit");
  };

  const handleWriteReview = () => {
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
              {USER_REVIEW ? (
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
                  <ReviewList reviews={[{ ...USER_REVIEW }]} hideAuthorInfo />
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
              {numReviews === 0
                ? "No Reviews"
                : numReviews === 1
                ? "Review"
                : "Reviews"}
            </div>
            <ReviewList reviews={[...albumReviews]} />
          </div>
        </div>
      )}
    </div>
  );
};
export default AlbumPage;
