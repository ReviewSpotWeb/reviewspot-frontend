import { useDispatch } from "react-redux";
import { Album } from "../../types/album";
import { AlbumPaginationInfo } from "../../types/pagination";
import PaginationBar from "../util/pagination-bar";
import { AppDispatch } from "../util/redux/store";
import AlbumListItem from "./album-list-item";
import { findHomeAlbumsAction } from "../../actions/albums-actions";

type AlbumListProps = {
  albums: Album[];
  paginationInfo?: AlbumPaginationInfo;
};

const AlbumList = (albumListProps: AlbumListProps) => {
  const { albums, paginationInfo } = albumListProps;

  const prev = paginationInfo ? paginationInfo.prev : null; // If previous page
  const next = paginationInfo ? paginationInfo.next : null; // If next page
  const dispatch: AppDispatch = useDispatch();

  const loadNext = () => {
    findHomeAlbumsAction(dispatch, next ?? undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const loadPrev = () => {
    findHomeAlbumsAction(dispatch, prev ?? undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ul className="w-full h-max flex flex-col gap-2 rounded">
      {albums.length > 0 &&
        albums.map((album, idx) => <AlbumListItem album={album} key={idx} />)}
      {(next || prev) && (
        <div>
          <PaginationBar
            next={next}
            prev={prev}
            loadNext={loadNext}
            loadPrev={loadPrev}
          />
        </div>
      )}
    </ul>
  );
};
export default AlbumList;
