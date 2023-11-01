import { Link } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumRating, { RatingInfo } from "./album-rating";
import {
  MusicNoteIcon,
  ReviewIcon,
  SpotifyIcon,
  SpotifyIconSmall,
} from "../util/icons";
import { formatReleaseDate } from "../../helpers/album-helpers";
import AlbumArtists from "./album-artists";
import AlbumTitle from "./album-title";
import AlbumCover from "./album-cover";
import AlbumItemBrowser from "./album-item-browser";

const AlbumListItem = ({ album }: { album: Album }) => {
  const numReviews: number = 0;
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;

  const ratings: RatingInfo[] = [
    {
      label: "Spotify",
      icon: <SpotifyIconSmall />,
      rating: album.popularity,
      color: "green-500",
    },
    {
      label: "ReviewSpot",
      icon: <div>RS</div>,
      rating: albumRating,
      color: "yellow-500",
    },
  ];

  return (
    <li className="h-max w-full rounded p-2 bg-[#404040] text-gray-300 relative">
      <div className="hidden md:block">
        <AlbumItemBrowser album={album} />
      </div>
      {/* Smaller than md */}
      <div className="md:hidden">
        <div className="absolute right-4 top-4">
          <Link
            to={album.external_urls.spotify}
            rel="noreferrer"
            target={"_blank"}
          >
            <SpotifyIcon />
          </Link>
        </div>
        <div className="flex flex-col gap-1 w-full">
          {/* First row */}
          <div className="w-full h-full flex">
            {/* Left side */}
            <div className="w-1/3 flex flex-col">
              <div>
                <AlbumCover album={album} />
              </div>
            </div>
            {/* Right side */}
            <div className="w-2/3 ps-1">
              <div className="h-full flex flex-col justify-center bg-[#303030] rounded">
                <div className="mx-8">
                  <AlbumTitle album={album} />
                </div>
                <AlbumArtists artists={album.artists} />
                <div className="text-center text-gray-400">
                  {formatReleaseDate(album.release_date)}
                </div>
              </div>
            </div>
          </div>
          {/* Second row */}
          <div className="w-full h-full flex">
            {/* Left side */}
            <div className="w-1/3 flex flex-col gap-1 whitespace-pre">
              <div className="bg-[#202020] p-2 px-4 rounded cursor-default border border-transparent hover:border-blue-500 flex items-center justify-center">
                <b> {album.total_tracks}</b>
                <span className="hidden sm:inline"> Tracks</span>
                <span> </span>
                <MusicNoteIcon />
              </div>
              <div className="bg-[#202020] p-2 px-4 rounded cursor-default border border-transparent hover:border-blue-500 flex items-center justify-center">
                <b> {numReviews}</b>
                <span className="hidden sm:inline"> Reviews</span>
                <span> </span>
                <ReviewIcon />
              </div>
            </div>
            {/* Right side */}
            <div className="w-2/3 ps-1">
              <AlbumRating ratings={ratings} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AlbumListItem;
