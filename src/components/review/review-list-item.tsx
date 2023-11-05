import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Review } from "../../types/review";
import { Album } from "../../types/album";
import { Role } from "../../types/user";
import {
  CommentIcon,
  HeartIcon,
  ReviewIcon,
  SpotifyIconSmall,
} from "../util/icons";
import { RatingInfo } from "../album/album-rating";
import AlbumRating from "../album/album-rating";
import UserBadge from "../user/user-badge";
import ProfilePicture from "../user/profile-picture";
import { findAlbum } from "../../services/albums-services";
import { loginToast } from "../../helpers/auth-helpers";

const ReviewListItem = ({
  review,
  hideAuthorInfo = false,
}: {
  review: Review;
  hideAuthorInfo?: boolean;
}) => {
  // TODO: Get from state
  const loggedIn = false;

  const [album, setAlbum] = useState<Album | null>(null);
  const { reviewId, albumId } = useParams();

  useEffect(() => {
    findAlbum(review.albumId).then((album) => setAlbum(album));
  }, [review.albumId]);
  const { authorName, authorRole } = review.authorInfo;
  const role: Role = Role[authorRole as keyof typeof Role];

  const onReviewPage = review._id === reviewId;
  const onAlbumPage = review.albumId === albumId;

  // TODO: Replace with ReviewSpot average rating for this album
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;

  const ratings: RatingInfo[] = onReviewPage
    ? [
        {
          label: "ReviewSpot",
          icon: <div>RS</div>,
          rating: albumRating,
          color: "bg-yellow-500",
        },
        {
          label: "Spotify",
          icon: <SpotifyIconSmall />,
          rating: album ? album.popularity : null,
          color: "bg-green-500",
        },
      ]
    : [
        {
          label: "",
          rating: review.rating.rating,
          color: "bg-blue-500",
        },
      ];

  const handleLike = (reviewId: string) => {
    if (!loggedIn) {
      loginToast("Login to like a review", "top-center");
      return;
    }
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
        <div className="w-full flex gap-2">
          <div className={hideAuthorInfo ? "hidden" : colSmall}>
            <Link to={`/user/${authorName.toLowerCase()}`}>
              <div
                className="w-full text-white font-bold bg-[#303030] border-2 border-[#222] hover:border-blue-500 rounded"
                title={`${authorName} - ${role.toLowerCase()}`}
              >
                <div className="flex justify-center items-center">
                  <span className="truncate" title={authorName}>
                    {authorName}
                  </span>

                  <UserBadge role={role} />
                </div>
              </div>
            </Link>
          </div>
          {!onAlbumPage && album && (
            <div className={hideAuthorInfo ? "w-full" : colBig}>
              <div className="w-full">
                <div className="flex justify-center items-center mx-4">
                  <Link
                    to={`/album/${album.id}`}
                    className="font-bold text-lg truncate"
                  >
                    <span className="hover:text-green-400" title={album.name}>
                      {album.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Second Row - fill any space*/}
        <div className="w-full flex gap-2">
          <div className={hideAuthorInfo ? "hidden" : colSmall}>
            <Link to={`/user/${authorName.toLowerCase()}`}>
              <div className="h-full w-full flex flex-col bg-[#303030] border-4 gap-1 border-[#222] hover:border-blue-500 rounded">
                <div className="flex flex-col w-full h-full justify-center">
                  <div
                    className="rounded flex justify-center w-full h-full"
                    title={authorName}
                  >
                    <ProfilePicture userId={authorName} />
                  </div>
                </div>
              </div>
            </Link>
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
                        label: "Rating",
                        icon: <ReviewIcon />,
                        rating: review.rating.rating,
                        color: "bg-blue-500",
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Third Row */}
        <div className="w-full gap-2 flex">
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
