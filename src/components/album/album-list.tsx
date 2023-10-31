import { Album } from "../../types/album";
import PaginationBar, { PaginationInfo } from "../util/pagination-bar";
import AlbumListItem from "./album-list-item";

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
  const PAGE_SIZE = 10;

  return (
    <ul className="w-full h-max flex flex-col gap-2 rounded">
      {albums.length > 0 &&
        albums.map((album, idx) => <AlbumListItem album={album} key={idx} />)}
      {albums.length > PAGE_SIZE && (
        <div>
          <PaginationBar paginationInfo={paginationInfo} />
        </div>
      )}
    </ul>
  );
};
export default AlbumList;
