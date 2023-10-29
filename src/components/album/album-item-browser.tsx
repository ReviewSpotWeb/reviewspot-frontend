import { useNavigate, Link } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumArtists from "./album-artists";
import AlbumRating, { RatingInfo } from "./album-rating";
import AlbumTitle from "./album-title";
import { MusicNoteIcon, ReviewIcon, SpotifyIcon } from "../util/icons";
import { formatReleaseDate } from "../../helpers/album-helpers";

const AlbumItemBrowser = ({ album }: { album: Album }) => {
  const navigate = useNavigate();
  const numReviews: number = 0;
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;

  const ratings: RatingInfo[] = [
    {
      label: "Spotify",
      rating: album.popularity,
      color: "green-500",
    },
    {
      label: "ReviewSpot",
      rating: albumRating,
      color: "yellow-400",
    },
  ];

  return (
    <div className="hidden sm:flex cursor-default">
      <div className="flex justify-between items-center w-full gap-2">
        <img
          src={album.images[0].url}
          alt={`${album.name} album cover`}
          className="object-fit rounded cursor-pointer w-1/3"
          onClick={() => navigate(`/album/${album.id}`)}
        />
        <div className="w-full h-full flex flex-col items-center justify-between overflow-hidden gap-2">
          <div className="absolute right-4 top-4">
            <Link
              to={album.external_urls.spotify}
              rel="noreferrer"
              target={"_blank"}
            >
              <SpotifyIcon />
            </Link>
          </div>
          <div className="h-full flex flex-col justify-center w-full bg-[#303030] rounded border border-transparent hover:border-blue-500">
            <div className="mx-7">
              <AlbumTitle album={album} />
            </div>
            <AlbumArtists artists={album.artists} />
            <div className="text-center text-gray-400">
              {formatReleaseDate(album.release_date)}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex whitespace-pre justify-around bg-[#303030] p-1 rounded border border-transparent hover:border-blue-500">
              <div className="flex">
                <MusicNoteIcon />
                <b> {album.total_tracks}</b> Tracks
              </div>
              <div className="flex">
                <b>{numReviews}</b> <span> Reviews </span>
                <ReviewIcon />
              </div>
            </div>
            <div>
              <AlbumRating ratings={ratings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlbumItemBrowser;
