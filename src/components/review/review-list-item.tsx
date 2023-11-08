import { Link, useNavigate, useParams } from "react-router-dom";
import { Review } from "../../types/review";
import { Role } from "../../types/user";
import {
  CommentIcon,
  DeleteIcon,
  HeartIcon,
  HeartIconSolid,
  ReviewIcon,
  SpotifyIconSmall,
} from "../util/icons";
import AlbumRating from "../album/album-rating";
import UserBadge from "../user/user-badge";
import ProfilePicture from "../user/profile-picture";
import { useAppSelector } from "../util/redux/hooks";
import { showToastMessage } from "../../helpers/toast-helpers";
import {
  likeReviewAction,
  removeReviewAction,
} from "../../actions/reviews-actions";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { Album } from "../../types/album";

const ReviewListItem = ({
  review,
  album,
  hideAuthorInfo = false,
}: {
  review: Review;
  album?: Album;
  hideAuthorInfo?: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useAppSelector((state) => state.user.user.loggedIn);
  const userId = useAppSelector((state) => state.user.user._id);

  const { authorInfo, rating, likedBy } = review;
  const authorName = authorInfo ? authorInfo.authorName : "";
  const authorRole = authorInfo ? authorInfo.authorRole : "general";
  const role: Role = Role[authorRole.toUpperCase() as keyof typeof Role];
  const ratingValue = rating ? rating.rating : null;
  const numLikes = likedBy ? likedBy.length : 0;
  const ratings = album
    ? [
        {
          label: "Spotify",
          icon: <SpotifyIconSmall />,
          rating: album?.popularity || null,
          color: "bg-green-500",
        },
        {
          label: "Rating",
          icon: <ReviewIcon />,
          rating: ratingValue,
          color: "bg-blue-500",
        },
      ]
    : [
        {
          label: "Rating",
          icon: <ReviewIcon />,
          rating: ratingValue,
          color: "bg-blue-500",
        },
      ];

  const { reviewId } = useParams();
  const onReviewPage = review._id === reviewId;
  const albumName = album
    ? album.name
    : review.albumName
    ? review.albumName
    : null;

  const handleLike = () => {
    if (!loggedIn) {
      showToastMessage({
        message: "Login to like a review",
        position: "top-center",
      });
      return;
    }
    likeReviewAction(dispatch, review.albumId, review._id, userId).catch(
      (error) => showToastMessage({ message: error.message })
    );
  };

  // Can delete review if author
  const user = useAppSelector((state) => state.user.user);
  const username = user.username;
  const userIsAuthor = username === authorName.toLowerCase();
  const userLikedReview = review.likedBy.includes(user._id);

  const handleDeleteReview = () => {
    if (!review.albumId || !review._id) return;
    removeReviewAction(dispatch, review.albumId, review._id).catch((error) =>
      showToastMessage({ message: error.message })
    );
    navigate("/");
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
          {albumName && (
            <div className={hideAuthorInfo ? "w-full" : colBig}>
              <div className="w-full">
                <div className="flex justify-center items-center mx-4">
                  <Link
                    to={`/album/${review.albumId}`}
                    className="font-bold text-lg truncate"
                  >
                    <span className="hover:text-green-400" title={albumName}>
                      {albumName}
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
            </div>
          </div>
        </div>
        {/* Third Row */}
        <div className="w-full gap-2 flex">
          <div className={colSmall}>
            <div
              className={`flex lg:flex-col justify-between gap-1 h-full ${
                onReviewPage && "flex-col"
              }`}
            >
              <div className="w-full h-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                <b>{review.numComments} </b>
                <CommentIcon />
              </div>
              <div className="w-full h-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
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
      {userIsAuthor && onReviewPage && (
        <div
          className="absolute right-2 top-2 cursor-pointer fill-current hover:text-red-500"
          onClick={() => handleDeleteReview()}
        >
          <DeleteIcon />
        </div>
      )}
    </li>
  );
};
export default ReviewListItem;
