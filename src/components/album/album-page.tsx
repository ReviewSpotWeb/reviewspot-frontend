import { useParams } from "react-router-dom";
import albumsJson from "../../data/albums.json";
import { Album } from "../../types/album";
import AlbumListItemMobile from "./album-list-item-mobile";
import AlbumListItemBrowser from "./album-list-item-browser";

const AlbumPage = () => {
  const { id } = useParams();

  const albums: Album[] = albumsJson as never[];
  const album: Album = albums.filter((album) => album.id === id)[0];

  return (
    <div className="rounded w-full p-2 bg-[#404040] text-gray-300 relative">
      <AlbumListItemMobile album={album} />
      <AlbumListItemBrowser album={album} />
    </div>
  );
};
export default AlbumPage;
