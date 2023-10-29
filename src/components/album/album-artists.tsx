import { Artist } from "../../types/album";
import { Link } from "react-router-dom";

const AlbumArtists = ({ artists }: { artists: Artist[] }) => {
  return (
    <div
      className={`truncate text-center px-3`}
      title={`Artists: ${artists.map((artist) => artist.name).join(", ")}`}
    >
      {artists.map((artist, idx) => {
        return (
          <span className="whitespace-pre" key={idx}>
            <Link
              to={artist.external_urls.spotify}
              rel="noreferrer"
              target={"_blank"}
            >
              <span className="hover:text-blue-500">{artist.name}</span>
            </Link>
            {idx !== artists.length - 1 && <span>, </span>}
          </span>
        );
      })}
    </div>
  );
};
export default AlbumArtists;
