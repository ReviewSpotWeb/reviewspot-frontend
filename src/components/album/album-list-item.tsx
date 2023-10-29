import { Album } from "../../types/album";
import AlbumItemMobile from "./album-item-mobile";
import AlbumItemBrowser from "./album-item-browser";

const AlbumListItem = ({ album }: { album: Album }) => {
  return (
    <li className="rounded w-full p-2 bg-[#404040] text-gray-300 relative">
      <AlbumItemMobile album={album} />
      <AlbumItemBrowser album={album} />
    </li>
  );
};

export default AlbumListItem;
