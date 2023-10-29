import { Link, useParams } from "react-router-dom";
import { Album } from "../../types/album";

const AlbumTitle = ({ album }: { album: Album }) => {
  const { albumId } = useParams();
  const albumNameSize = album.name.length >= 20 ? "text-lg" : "text-2xl";
  const onAlbumPage = album.id === albumId;
  return (
    <div className={`${albumNameSize} truncate font-bold text-center`}>
      {!onAlbumPage ? (
        <Link to={`/album/${album.id}`}>
          <span className="hover:text-green-400" title={album.name}>
            {album.name}
          </span>
        </Link>
      ) : (
        <span className="hover:text-green-400" title={album.name}>
          {album.name}
        </span>
      )}
    </div>
  );
};
export default AlbumTitle;
