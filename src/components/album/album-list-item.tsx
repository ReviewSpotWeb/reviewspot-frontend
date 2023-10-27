import { Album } from "../../types/album";
import AlbumListItemMobile from "./album-list-item-mobile";
import AlbumListItemBrowser from "./album-list-item-browser";

const AlbumListItem = ({ album }: { album: Album }) => {
  return (
    <li className="rounded w-full p-2 bg-[#404040] text-gray-300">
      <AlbumListItemMobile album={album} />
      <AlbumListItemBrowser album={album} />
    </li>
  );
};

export default AlbumListItem;
