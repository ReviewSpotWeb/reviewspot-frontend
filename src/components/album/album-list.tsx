import { createElement } from "react";
import AlbumListItem from "./album-list-item";
import { Album } from "../../types/album";
import PaginationButton from "../util/pagination-button";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

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
    <ul className="w-full flex flex-col gap-2 p-2">
      {albums.length > 0 &&
        albums.map((album, idx) => <AlbumListItem album={album} key={idx} />)}
      <div className="bg-gray-500 flex justify-between p-1 m-2 rounded">
        {prev && (
          <PaginationButton onClick={loadPrev}>
            {createElement(ArrowLongLeftIcon, {
              className: "w-1/2",
            })}
          </PaginationButton>
        )}
        {next && (
          <PaginationButton onClick={loadNext}>
            {createElement(ArrowLongRightIcon, {
              className: "w-1/2",
            })}
          </PaginationButton>
        )}
      </div>
    </ul>
  );
};
export default AlbumList;
