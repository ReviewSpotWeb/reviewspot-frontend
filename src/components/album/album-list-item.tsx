import { Album } from "../../types/album";
import AlbumListItemMobile from "./album-item-mobile";
import AlbumListItemBrowser from "./album-item-browser";

const AlbumListItem = ({ album }: { album: Album }) => {
  return (
    <li className="rounded w-full p-2 bg-[#404040] text-gray-300 relative">
      <AlbumListItemMobile album={album} />
      <AlbumListItemBrowser album={album} />
    </li>
  );
};

export default AlbumListItem;
