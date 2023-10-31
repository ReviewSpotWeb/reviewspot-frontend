import { useNavigate, useParams } from "react-router-dom";
import { Album } from "../../types/album";

const AlbumCover = ({ album }: { album: Album }) => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const onAlbumPage = album.id === albumId;

  return (
    <img
      src={album.images[0].url}
      alt={`${album.name} album cover`}
      className={`object-fit h-full w-full rounded ${
        onAlbumPage ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={() => (!onAlbumPage ? navigate(`/album/${album.id}`) : "")}
    />
  );
};
export default AlbumCover;
