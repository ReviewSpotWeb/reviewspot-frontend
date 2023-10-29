import { useParams } from "react-router-dom";
import albumsJson from "../../data/albums.json";
import reviewJson from "../../data/reviews.json";
import { Album } from "../../types/album";
import AlbumItemMobile from "./album-item-mobile";
import AlbumItemBrowser from "./album-item-browser";
import { Review } from "../../types/review";
import ReviewList from "../review/review-list";
import { WriteOrEditReviewIcon } from "../util/icons";

const AlbumPage = () => {
  const { albumId } = useParams();

  const albums: Album[] = albumsJson as never[];
  const album: Album = albums.filter((album) => album.id === albumId)[0];

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
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="rounded w-full h-full p-2 bg-[#404040] text-gray-300">
            <AlbumItemMobile album={album} />
            <AlbumItemBrowser album={album} />
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
    </div>
  );
};
export default AlbumPage;
