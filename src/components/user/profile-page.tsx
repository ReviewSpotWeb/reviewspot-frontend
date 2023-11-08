import { useLoaderData } from "react-router-dom";
import ProfilePicture from "./profile-picture";
import { Role, UserProfile } from "../../types/user";
import { CommentIcon, ReviewIcon } from "../util/icons";
import { Album } from "../../types/album";
import { Link } from "react-router-dom";
import { Review } from "../../types/review";
import ReviewList from "../review/review-list";
import { useAppSelector } from "../util/redux/hooks";
import { useEffect, useState } from "react";
import { findAlbum } from "../../services/albums-services";

// TODO: move to diff file
const getReviewedAlbumIdsByRating = (reviews: Review[]): [number, string][] => {
  // [rating, albumId]
  const ratings: [number, string][] = reviews.map((review) => {
    return [review.rating.rating, review.albumId];
  });
  // sort by rating
  ratings.sort((a, b) => b[0] - a[0]);
  return ratings;
};

// TODO: move to diff file
const getFavoriteAlbums = async (reviews: Review[], num: number = 3) => {
  const reviewedAlbumIds = getReviewedAlbumIdsByRating(reviews);
  const reviewedAlbums = await Promise.all(
    reviewedAlbumIds.map(async ([, albumId]) => {
      return await findAlbum(albumId ?? "");
    })
  );
  return reviewedAlbums.slice(0, num);
};

const ProfilePage = () => {
  const [favoriteAlbums, setFavoriteAlbums] = useState<Album[]>([]);

  const reviewState = useAppSelector((state) => state.reviews);
  const { reviews, paginationInfo } = reviewState;
  const userProfile = useLoaderData() as UserProfile;
  const { userInfo, numReviews, numComments } = userProfile;

  useEffect(() => {
    // TODO: Replace this with endpoint for getting favorite albums
    getFavoriteAlbums(reviews).then((albums) => setFavoriteAlbums(albums));
  }, [reviews]);

  // TODO: Get numLikes from server

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-max bg-[#404040] rounded">
        <div className="w-full h-full flex flex-col p-2 text-gray-300 gap-1">
          <div className="flex w-full h-full gap-1">
            {/* Place avatar at bottom of frame - flex flex-col justify-end */}
            <div className="rounded bg-[#303030] w-1/3 md:w-1/4 lg:w-1/5">
              <ProfilePicture userId={userInfo.username ?? ""} />
            </div>
            <div className="w-2/3 md:w-3/4 lg:w-4/5">
              <div className="bg-[#303030] rounded w-full h-full">
                <div className="flex flex-col items-center w-full h-full p-2 gap-1">
                  <div className="flex justify-center items-center w-full h-max">
                    <div className="flex justify-center items-center w-full relative">
                      <span
                        className="font-bold text-xl md:text-3xl truncate"
                        title={userInfo.username}
                      >
                        {userInfo.username}
                      </span>
                      {userInfo.role === Role.MODERATOR && (
                        <div className="absolute right-0 w-max bg-purple-700 px-4 font-bold rounded-full border-2 border-[#202020] cursor-default">
                          Mod
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Favorite Albums */}
                  <div className="w-full h-full flex justify-center items-center gap-2">
                    {favoriteAlbums.length > 0 && (
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          {favoriteAlbums.map((album, idx) => {
                            return (
                              <Link to={`/album/${album.id}`} key={idx}>
                                <img
                                  title={album.name}
                                  src={album.images[0].url}
                                  alt={`${album.name} album cover`}
                                  className="h-20 sm:h-28 md:h-40 w-20 sm:w-28 md:w-40 rounded cursor-pointer border border-transparent hover:border-blue-500"
                                />
                              </Link>
                            );
                          })}
                        </div>
                        <div className="bg-[#202020] rounded text-center font-bold">
                          Favorites
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded flex gap-1">
            <div className="w-1/2 bg-[#202020] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
              <ReviewIcon />
              <div>
                <b
                  className="truncate whitespace-pre"
                  title={`${numReviews} ${
                    numReviews === 1 ? "review" : "reviews"
                  }`}
                >
                  <span className="hidden md:inline"> Written</span>{" "}
                  {`${numReviews} ${numReviews === 1 ? "review" : "reviews"}`}
                </b>
              </div>
            </div>
            <div className="w-1/2 truncate bg-[#202020] rounded px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
              <b
                className="truncate whitespace-pre"
                title={`${numComments} ${
                  numComments === 1 ? "comment" : "comments"
                }`}
              >
                <span className="hidden md:inline"> {"Left "}</span>
                {`${numComments} ${
                  numComments === 1 ? "comment" : "comments"
                } `}
              </b>
              <CommentIcon />
            </div>
            {/* TODO: Put this back when getting likes from serv */}
            {/* <div className="w-1/2 truncate bg-[#202020] rounded px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
              <b
                className="truncate whitespace-pre"
                title={`${numLikes} ${numLikes === 1 ? "like" : "likes"}`}
              >
                <span className="hidden md:inline"> {"Earned "}</span>
                {`${numLikes} ${numLikes === 1 ? "like" : "likes"} `}
              </b>
              <HeartIconSolid />
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full h-max flex flex-col gap-2">
        <div className="text-center font-bold text-xl bg-green-500 rounded">
          {numReviews === 0
            ? "No Reviews"
            : numReviews === 1
            ? "Review"
            : "Reviews"}
        </div>
        <ReviewList
          reviews={[...reviews]}
          hideAuthorInfo
          paginationInfo={paginationInfo}
        />
      </div>
    </div>
  );
};
export default ProfilePage;
