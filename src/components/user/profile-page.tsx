import { useParams } from "react-router-dom";
import ProfilePicture from "./profile-picture";
import { Role, User } from "../../types/user";
import usersJson from "../../data/users.json";
import { HeartIconSolid, ReviewIcon } from "../util/icons";
import { Album } from "../../types/album";
import albumsJson from "../../data/albums.json";
import reviewsJson from "../../data/reviews.json";
import { Link } from "react-router-dom";
import { Review } from "../../types/review";
import ReviewList from "../review/review-list";
import PaginationBar, { PaginationInfo } from "../util/pagination-bar";

const ProfilePage = () => {
  const { id } = useParams();
  const users: User[] = usersJson as never[];
  const user: User = users.filter(
    (user) => user.username.toLowerCase() === id
  )[0];

  let numLikes: number = 0;
  const reviews: Review[] = reviewsJson.filter((review) => {
    if (review.authorInfo.authorName.toLowerCase() === id) {
      numLikes += review.likedBy.length;
      return review;
    }
  }) as never[];
  const numReviews: number = reviews.length;

  const FAVORITE_ALBUMS: Album[] = albumsJson.slice(
    Math.floor(Math.random() * albumsJson.length)
  ) as never[];

  const prev = true; // If previous page
  const next = true; // If next page

  const loadNext = () => {
    console.log("next on profile page");
    return;
  };
  const loadPrev = () => {
    console.log("prev on profile page");
    return;
  };
  const paginationInfo: PaginationInfo = {
    prev,
    next,
    loadNext,
    loadPrev,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-max bg-[#404040] rounded">
        <div className="w-full h-full flex flex-col p-2 text-gray-300 gap-1">
          <div className="flex w-full h-full gap-1">
            {/* Place avatar at bottom of frame - flex flex-col justify-end */}
            <div className="rounded bg-[#303030] border-4 border-[#202020] w-1/3 md:w-1/4 lg:w-1/5">
              <ProfilePicture userId={id ?? ""} />
            </div>
            <div className="w-2/3 md:w-3/4 lg:w-4/5">
              <div className="bg-[#303030] rounded w-full h-full border-4 border-[#202020]">
                <div className="flex flex-col items-center w-full h-full p-2 gap-1">
                  <div className="flex justify-center items-center w-full h-max">
                    <div className="flex justify-center items-center w-full relative">
                      <span
                        className="font-bold text-xl md:text-3xl truncate"
                        title={user.username}
                      >
                        {user.username}
                      </span>
                      {user.role === Role.MODERATOR && (
                        <div className="absolute right-0 w-max bg-purple-700 px-4 font-bold rounded-full border-2 border-[#202020] cursor-default">
                          Mod
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-full flex justify-center items-center gap-2">
                    {FAVORITE_ALBUMS.length > 0 && (
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          {FAVORITE_ALBUMS.map((album, idx) => {
                            return (
                              <Link to={`/album/${album.id}`} key={idx}>
                                <img
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
          <div className="rounded flex gap-2">
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
                title={`${numLikes} ${numLikes === 1 ? "like" : "likes"}`}
              >
                <span className="hidden md:inline"> {"Earned "}</span>
                {`${numLikes} ${numLikes === 1 ? "like" : "likes"} `}
              </b>
              <HeartIconSolid />
            </div>
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
        <ReviewList reviews={reviews} hideAuthorInfo />
        <PaginationBar paginationInfo={paginationInfo} />
      </div>
    </div>
  );
};
export default ProfilePage;
