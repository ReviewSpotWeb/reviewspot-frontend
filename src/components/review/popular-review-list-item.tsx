import { Link } from "react-router-dom";
import { Review } from "../../types/review";
import { Album } from "../../types/album";
import { Role } from "../../types/user";
import { CommentIcon, HeartIcon, HeartIconSolid } from "../util/icons";
import { RatingInfo } from "../album/album-rating";
import AlbumRating from "../album/album-rating";
import UserBadge from "../user/user-badge";
import ProfilePicture from "../user/profile-picture";
import { useAppSelector } from "../util/redux/hooks";
import { showToastMessage } from "../../helpers/toast-helpers";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { likePopularReviewAction } from "../../actions/popular-reviews-actions";

const PopularReviewListItem = ({
  review,
  album,
}: {
  review: Review;
  album: Album;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const loggedIn = useAppSelector((state) => state.user.user.loggedIn);
  const userId = useAppSelector((state) => state.user.user._id);

  const { authorInfo, rating, likedBy } = review;
  const authorName = authorInfo ? authorInfo.authorName : "";
  const authorRole = authorInfo ? authorInfo.authorRole : "general";
  const role: Role = Role[authorRole.toUpperCase() as keyof typeof Role];
  const ratingValue = rating ? rating.rating : null;
  const numLikes = likedBy ? likedBy.length : 0;

  const userLikedReview = review.likedBy.includes(userId);

  const ratings: RatingInfo[] = [
    {
      label: "",
      rating: ratingValue,
      color: "bg-blue-500",
    },
  ];

  const handleLike = () => {
    if (!loggedIn) {
      showToastMessage({
        message: "Login to like a review",
        position: "top-center",
      });
      return;
    }
    likePopularReviewAction(dispatch, review.albumId, review._id, userId).catch(
      (error) => showToastMessage({ message: error.message })
    );
  };

  const goToReviewButton = (
    <Link to={`/album/${review.albumId}/review/${review._id}`}>
      <div className="text-green-400 bg-[#303030] border-2 border-transparent hover:border-green-400 rounded font-bold flex justify-center items-center h-full">
        Go to Review
      </div>
    </Link>
  );

  const colSmall = "w-1/3 sm:w-1/4";
  const colBig = "w-2/3 sm:w-3/4";
  return (
    <li className="bg-[#404040] rounded p-2 text-gray-300 h-max relative">
      <div className="flex flex-col gap-1 w-full">
        {/* First Row */}
        <div className="w-full flex gap-2">
          <div className={colSmall}>
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
          {album && (
            <div className={colBig}>
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
          <div className={colSmall}>
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
          <div className={colBig}>
            <div className="rounded h-full w-full text-center flex flex-col justify-between gap-2">
              <div className="h-full w-full bg-[#303030] p-2 rounded border border-transparent hover:border-blue-500 cursor-default flex justify-center items-center">
                <div className="line-clamp-5 lg:line-clamp-3 xl:line-clamp-4">
                  {review.content}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Third Row */}
        <div className="w-full gap-2 flex">
          <div className={colSmall}>
            <div className="flex lg:flex-col justify-between gap-1">
              <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                <b>{review.numComments} </b>
                <CommentIcon />
              </div>
              <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                <b>{numLikes} </b>
                <div
                  className="flex justify-center items-center cursor-pointer "
                  onClick={() => handleLike()}
                >
                  {userLikedReview ? <HeartIconSolid /> : <HeartIcon />}
                </div>
              </div>
            </div>
          </div>
          <div className={colBig}>
            <div className="flex flex-col h-full gap-1">
              <div className="h-full w-full">
                <AlbumRating ratings={ratings} />
              </div>
              <div className="h-full lg:inline hidden">{goToReviewButton}</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden">{goToReviewButton}</div>
      </div>
    </li>
  );
};
export default PopularReviewListItem;
