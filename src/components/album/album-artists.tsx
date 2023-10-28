import { Artist } from "../../types/album";

const AlbumArtists = ({ artists }: { artists: Artist[] }) => {
  const searchArtist = (artistId: string) => {
    console.log(artistId);
  };
  return (
    <div
      className={`truncate text-center px-3`}
      title={`Artists: ${artists.map((artist) => artist.name).join(", ")}`}
    >
      {artists.map((artist, idx) => {
        return (
          <span
            className="whitespace-pre cursor-pointer"
            key={idx}
            onClick={() => searchArtist(artist.id)}
          >
            <span className="hover:text-blue-500">{artist.name}</span>
            {idx !== artists.length - 1 && <span>, </span>}
          </span>
        );
      })}
    </div>
  );
};
export default AlbumArtists;