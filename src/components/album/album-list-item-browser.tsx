import { useNavigate } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumArtists from "./album-artists";
import AlbumPopularity from "./album-popularity";
import AlbumTitle from "./album-title";
import { MusicNoteIcon, ReviewIcon } from "./album-icons";
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
          className="object-fit h-48 md:h-56 lg:h-64 rounded cursor-pointer hover:border-2 border-green-400"
          onClick={() => navigate(`/album/${album.id}`)}
        />
        <div className="w-full flex flex-col items-center justify-between h-48 md:h-56 lg:h-64 overflow-hidden">
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
