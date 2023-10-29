import AlbumListItem from "./album-list-item";
import { Album } from "../../types/album";
import PaginationBar, { PaginationInfo } from "../util/pagination-bar";

const AlbumList = ({ albums }: { albums: Album[] }) => {
  const prev = true; // If previous page
  const next = true; // If next page

  const loadNext = () => {
    return;
  };
  const loadPrev = () => {
    return;
  };
  const paginationInfo: PaginationInfo = {
    prev,
    next,
    loadNext,
    loadPrev,
  };

  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {albums.length > 0 &&
        albums.map((album, idx) => <AlbumListItem album={album} key={idx} />)}
      <div>
        <PaginationBar paginationInfo={paginationInfo} />
      </div>
    </ul>
  );
};
export default AlbumList;
