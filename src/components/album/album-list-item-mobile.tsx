import { useNavigate, Link } from "react-router-dom";
import { Album } from "../../types/album";
import AlbumArtists from "./album-artists";
import {
  InfoIcon,
  MusicNoteIcon,
  ReviewIcon,
  SpotifyIcon,
} from "./album-icons";
import { formatReleaseDate } from "../../helpers/album-helpers";
import AlbumTitle from "./album-title";
import AlbumPopularity from "./album-popularity";

const AlbumListItemMobile = ({ album }: { album: Album }) => {
  const navigate = useNavigate();

  const numReviews: number = 0;
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;
  return (
    <div className="sm:hidden">
      <div className="w-full relative">
        <div className="absolute right-2">
          <Link
            to={album.external_urls.spotify}
            rel="noreferrer"
            target={"_blank"}
          >
            <SpotifyIcon />
          </Link>
        </div>
        <div className="absolute left-0">
          <InfoIcon
            title={`${album.name}\nReleased: ${formatReleaseDate(
              album.release_date
            )}`}
          />
        </div>
        <div className="px-7">
          <AlbumTitle album={album} />
        </div>
        <AlbumArtists artists={album.artists} />
      </div>
      <img
        src={album.images[0].url}
        alt={`${album.name} album cover`}
        className="object-fit h-full border border-transparent rounded cursor-pointer"
        onClick={() => navigate(`/album/${album.id}`)}
      />
      <div className="flex mt-2 gap-2 cursor-default">
        <div className="w-1/5 whitespace-pre bg-[#303030] rounded flex flex-col justify-around items-center border border-transparent hover:border-blue-500">
          <div className="flex justify-center items-center">
            <MusicNoteIcon />
            <b> {album.total_tracks}</b>
          </div>
          <div className="flex justify-center items-center">
            <b>{numReviews} </b>
            <ReviewIcon />
          </div>
        </div>
        <div className="w-full text-gray-300 flex flex-col">
          <AlbumPopularity popularity={album.popularity} rating={albumRating} />
        </div>
      </div>
    </div>
  );
};

export default AlbumListItemMobile;
