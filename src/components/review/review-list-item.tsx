import { Link } from "react-router-dom";
import { Review } from "../../types/review";
import albumsJson from "../../data/albums.json";
import { Album } from "../../types/album";
import { Role } from "../../types/user";
import { HeartIcon, ReviewIcon, SpotifyIconSmall } from "../util/icons";
import { RatingInfo } from "../album/album-rating";
import AlbumRating from "../album/album-rating";
import UserBadge from "../user/user-badge";
import ProfilePicture from "../user/profile-picture";

const ReviewListItem = ({ review }: { review: Review }) => {
  const albums: Album[] = albumsJson as never[];
  const album = albums.filter((album) => album.id === review.albumId)[0];

  const { authorName, authorRole } = review.authorInfo;
  const role: Role = Role[authorRole as keyof typeof Role];

  const ratings: RatingInfo[] = [
    {
      label: "",
      rating: review.rating.rating,
      color: "blue-500",
    },
  ];

  const handleLike = (reviewId: string) => {
    console.log(`${authorName} liked review #${reviewId}`);
  };

  const colSmall = "w-1/3 sm:w-1/4";
  const colBig = "w-2/3 sm:w-3/4";
  return (
    <li className="bg-[#404040] rounded p-2 text-gray-300 h-max">
      <div className="flex flex-col gap-1 w-full">
        {/* First Row */}
        <div className="w-full flex">
          <div className={colSmall}>
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
          <div className={colBig}>
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
          <div className={colSmall}>
            <Link to={`/user/${authorName.toLowerCase()}`}>
              <div
                className="rounded bg-[#303030] border-4 border-[#222] hover:border-blue-500 flex justify-center"
                title={authorName}
              >
                <ProfilePicture userId={authorName} />
              </div>
            </Link>
          </div>
          <div className={colBig}>
            <div className="bg-[#303030] rounded px-2 h-full flex justify-center items-center text-center border border-transparent hover:border-blue-500 cursor-default">
              <div className="line-clamp-5 lg:line-clamp-3 xl:line-clamp-4">
                {review.content}
              </div>
            </div>
          </div>
        </div>
        {/* Third Row */}
        <div className="w-full flex gap-2">
          <div className={colSmall}>
            <div className="flex lg:flex-col justify-between gap-1">
              <div className="w-full bg-[#303030] rounded whitespace-pre px-2 py-1 rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
                <b>{review.numComments} </b>
                <ReviewIcon />
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
              <div className="h-full">
                <AlbumRating ratings={ratings} hideNoRating />
              </div>
              <div className="h-full lg:inline hidden">
                <Link to={`/review/${review._id}`}>
                  <div className="bg-[#303030] border-2 border-transparent hover:border-blue-400 rounded font-bold flex justify-center items-center h-full">
                    Go to Review
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Render go to review button at bottom of screens < lg */}
        <div className="w-full lg:hidden">
          <Link to={`/review/${review._id}`}>
            <div className="bg-[#303030] border-2 border-transparent hover:border-blue-400 rounded font-bold flex justify-center items-center h-full">
              Go to Review
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
};
export default ReviewListItem;
