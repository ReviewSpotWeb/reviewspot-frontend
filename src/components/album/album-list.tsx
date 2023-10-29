import AlbumListItem from "./album-list-item";
import { Album } from "../../types/album";
import PaginationButton from "../util/pagination-button";
import { ArrowLeftIcon, ArrowRightIcon } from "../util/icons";

const AlbumList = ({ albums }: { albums: Album[] }) => {
  const prev = true; // If previous page
  const next = true; // If next page

  const loadNext = () => {
    return;
  };
  const loadPrev = () => {
    return;
  };

  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {albums.length > 0 &&
        albums.map((album, idx) => <AlbumListItem album={album} key={idx} />)}
      <div className="bg-gray-500 flex justify-between p-1 rounded">
        {prev && (
          <PaginationButton onClick={loadPrev}>
            <div className="w-full flex justify-center">
              <ArrowLeftIcon />
            </div>
          </PaginationButton>
        )}
        {next && (
          <PaginationButton onClick={loadNext}>
            <div className="w-full flex justify-center">
              <ArrowRightIcon />
            </div>
          </PaginationButton>
        )}
      </div>
    </ul>
  );
};
export default AlbumList;
