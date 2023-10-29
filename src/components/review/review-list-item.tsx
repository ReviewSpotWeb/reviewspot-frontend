import { Link, useParams } from "react-router-dom";
import { Review } from "../../types/review";
import albumsJson from "../../data/albums.json";
import { Album } from "../../types/album";
import { Role } from "../../types/user";
import { CommentIcon, HeartIcon, SpotifyIconSmall } from "../util/icons";
import { RatingInfo } from "../album/album-rating";
import AlbumRating from "../album/album-rating";
import UserBadge from "../user/user-badge";
import ProfilePicture from "../user/profile-picture";

const ReviewListItem = ({
  review,
  hideAuthorInfo = false,
}: {
  review: Review;
  hideAuthorInfo?: boolean;
}) => {
  const { id } = useParams();
  const albums: Album[] = albumsJson as never[];
  const album = albums.filter((album) => album.id === review.albumId)[0];

  const { authorName, authorRole } = review.authorInfo;
  const role: Role = Role[authorRole as keyof typeof Role];

  const onReviewPage = review._id === id;
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;
  const ratings: RatingInfo[] = onReviewPage
    ? [
        {
          label: "ReviewSpot",
          rating: albumRating,
          color: "yellow-500",
        },
        {
          label: "Spotify",
          rating: album.popularity,
          color: "green-500",
        },
      ]
    : [{ label: "", rating: review.rating.rating, color: "blue-500" }];
  const handleLike = (reviewId: string) => {
    console.log(`${authorName} liked review #${reviewId}`);
  };

  const goToReviewButton = (
    <Link to={`/review/${review._id}`}>
      <div className="text-green-400 bg-[#303030] border-2 border-transparent hover:border-green-400 rounded font-bold flex justify-center items-center h-full">
        Go to Review
      </div>
    </Link>
  );

  const colSmall = "w-1/3 sm:w-1/4";
  const colBig = "w-2/3 sm:w-3/4";
  return (
    <li className="bg-[#404040] rounded p-2 text-gray-300 h-max">
      <div className="flex flex-col gap-1 w-full">
        {/* First Row */}
        <div className="w-full flex">
          <div className={hideAuthorInfo ? "hidden" : colSmall}>
            <Link to={`/user/${authorName.toLowerCase()}`}>
              <div className="w-full text-white font-bold bg-[#303030] border-2 border-[#222] hover:border-blue-500 rounded">
                <div className="flex justify-center items-center">
                  <span className="truncate" title={authorName}>
                    {authorName}
                  </span>

                  <UserBadge role={role} />
                </div>
              </div>
            </Link>
          </div>
          <div className={hideAuthorInfo ? "w-full" : colBig}>
            <div className="w-full relative">
              <div className="flex justify-center items-center mx-6">
                <Link
                  to={`/album/${album.id}`}
                  className="font-bold text-lg truncate"
                >
                  <span className="hover:text-green-400" title={album.name}>
                    {album.name}
                  </span>
                </Link>
              </div>
              <div className="absolute right-0 top-0">
                <Link
                  to={album.external_urls.spotify}
                  rel="noreferrer"
                  target={"_blank"}
                  className="flex justify-center items-center"
                >
                  <SpotifyIconSmall />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - fill any space*/}
        <div className="w-full flex gap-2">
          <div className={hideAuthorInfo ? "hidden" : colSmall}>
            <div className="h-full w-full flex flex-col gap-1">
              <div className="flex flex-col w-full h-full justify-center">
                <Link to={`/user/${authorName.toLowerCase()}`}>
                  <div
                    className="rounded bg-[#303030] border-4 border-[#222] hover:border-blue-500 flex justify-center"
                    title={authorName}
                  >
                    <ProfilePicture userId={authorName} />
                  </div>
                </Link>
              </div>
              <div className="flex md:hidden justify-center items-center gap-1">
                <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                  <b>{review.numComments} </b>
                  <CommentIcon />
                </div>
                <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                  <b>{review.likedBy.length} </b>
                  <div
                    className="flex justify-center items-center cursor-pointer "
                    onClick={() => handleLike(review._id)}
                  >
                    <HeartIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={hideAuthorInfo ? "w-full h-full" : colBig}>
            <div className="rounded h-full w-full text-center flex flex-col justify-between gap-2">
              <div className="h-full w-full bg-[#303030] p-2 rounded border border-transparent hover:border-blue-500 cursor-default flex justify-center items-center">
                <div className="line-clamp-5 lg:line-clamp-3 xl:line-clamp-4">
                  {review.content}
                </div>
              </div>
              {onReviewPage && (
                <div className="h-max w-full">
                  <AlbumRating
                    ratings={[
                      {
                        label: authorName,
                        rating: review.rating.rating,
                        color: "blue-500",
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Third Row */}
        <div className="w-full gap-2 hidden md:flex">
          <div className={colSmall}>
            <div
              className={`flex lg:flex-col justify-between gap-1 ${
                onReviewPage && "flex-col"
              }`}
            >
              <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                <b>{review.numComments} </b>
                <CommentIcon />
              </div>
              <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                <b>{review.likedBy.length} </b>
                <div
                  className="flex justify-center items-center cursor-pointer "
                  onClick={() => handleLike(review._id)}
                >
                  <HeartIcon />
                </div>
              </div>
            </div>
          </div>
          <div className={colBig}>
            <div className="flex flex-col h-full gap-1">
              <div className="h-full w-full">
                <AlbumRating ratings={ratings} />
              </div>
              {!onReviewPage && (
                <div className="h-full lg:inline hidden">
                  {goToReviewButton}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Render go to review button at bottom of screens < lg */}
        {!onReviewPage && (
          <div className="w-full lg:hidden">{goToReviewButton}</div>
        )}
      </div>
    </li>
  );
};
export default ReviewListItem;
