import { Link } from "react-router-dom";
import { Album } from "../../types/album";

const AlbumTitle = ({ album }: { album: Album }) => {
  const albumNameSize = album.name.length >= 20 ? "text-lg" : "text-2xl";
  return (
    <div className={`${albumNameSize} truncate font-bold text-center me-7`}>
      <Link to={`/album/${album.id}`}>
        <span className="hover:text-green-400" title={album.name}>
          {album.name}
        </span>
      </Link>
    </div>
  );
};
export default AlbumTitle;
