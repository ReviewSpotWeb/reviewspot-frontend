import { useNavigate, Link } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumArtists from "./album-artists";
import AlbumPopularity from "./album-popularity";
import AlbumTitle from "./album-title";
import { MusicNoteIcon, ReviewIcon, SpotifyIcon } from "./album-icons";
import { formatReleaseDate } from "../../helpers/album-helpers";
const AlbumListItemBrowser = ({ album }: { album: Album }) => {
  const navigate = useNavigate();
  const numReviews: number = 0;
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;

  return (
    <div className="hidden sm:flex cursor-default">
      <div className="flex justify-between items-center w-full gap-2">
        <img
          src={album.images[0].url}
          alt={`${album.name} album cover`}
          className="object-fit rounded cursor-pointer w-1/3"
          onClick={() => navigate(`/album/${album.id}`)}
        />
        <div className="w-full h-full flex flex-col items-center justify-between overflow-hidden">
          <div className="absolute right-2">
            <Link
              to={album.external_urls.spotify}
              rel="noreferrer"
              target={"_blank"}
            >
              <SpotifyIcon />
            </Link>
          </div>
          <div className="h-full flex flex-col justify-center w-full">
            <AlbumTitle album={album} />
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
            <AlbumPopularity
              popularity={album.popularity}
              rating={albumRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlbumListItemBrowser;
