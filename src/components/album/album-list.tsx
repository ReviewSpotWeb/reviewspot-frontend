import { useDispatch } from "react-redux";
import { Album } from "../../types/album";
import { PaginationInfo } from "../../types/pagination";
import PaginationBar from "../util/pagination-bar";
import { AppDispatch } from "../util/redux/store";
import AlbumListItem from "./album-list-item";
import {
  findHomeAlbumsAction,
  findSearchAlbumsAction,
} from "../../actions/albums-actions";
import { useSearchParams } from "react-router-dom";
import { showToastMessage } from "../../helpers/toast-helpers";

type AlbumListProps = {
  albums: Album[];
  paginationInfo?: PaginationInfo;
};

const AlbumList = (albumListProps: AlbumListProps) => {
  const { albums, paginationInfo } = albumListProps;

  const prev = paginationInfo ? paginationInfo.prev : null; // If previous page
  const next = paginationInfo ? paginationInfo.next : null; // If next page
  const dispatch: AppDispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const loadNext = () => {
    if (q)
      findSearchAlbumsAction(dispatch, q, next ?? undefined).catch((error) =>
        showToastMessage({ message: error.message })
      );
    else
      findHomeAlbumsAction(dispatch, next ?? undefined).catch((error) =>
        showToastMessage({ message: error.message })
      );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const loadPrev = () => {
    if (q)
      findSearchAlbumsAction(dispatch, q, prev ?? undefined).catch((error) =>
        showToastMessage({ message: error.message })
      );
    else
      findHomeAlbumsAction(dispatch, prev ?? undefined).catch((error) =>
        showToastMessage({ message: error.message })
      );
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
