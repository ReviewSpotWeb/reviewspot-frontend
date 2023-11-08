import { useEffect } from "react";
import AlbumList from "../album/album-list";
import Tabs, { TabInfo } from "../util/tabs";
import { useAppSelector } from "../util/redux/hooks";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { findSearchAlbumsAction } from "../../actions/albums-actions";
import { useSearchParams } from "react-router-dom";
import { showToastMessage } from "../../helpers/toast-helpers";
import { findHomeReviewsAction } from "../../actions/popular-reviews-actions";
import PopularReviewList from "../review/popular-review-list";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const dispatch: AppDispatch = useDispatch();

  const albumState = useAppSelector((state) => state.albums);
  const { albums, paginationInfo: albumPaginationInfo } = albumState;
  const popularReviewState = useAppSelector((state) => state.popularReviews);
  const { popularReviews } = popularReviewState;

  useEffect(() => {
    if (!q) {
      showToastMessage({ message: "No results found" });
      return;
    }
    findSearchAlbumsAction(dispatch, q).catch((error) =>
      showToastMessage({ message: error.message })
    );
    findHomeReviewsAction(dispatch).catch((error) =>
      showToastMessage({ message: error.message })
    );
  }, [dispatch, q]);

  const tabs: TabInfo[] = [
    {
      key: "albums",
      label: "Albums",
      children: (
        <AlbumList albums={[...albums]} paginationInfo={albumPaginationInfo} />
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      children: <PopularReviewList popularReviews={popularReviews} />,
    },
  ];

  return (
    <div>
      <div className="lg:hidden">
        <Tabs tabs={tabs} />
      </div>
      <div className="justify-between gap-3 hidden lg:flex">
        <div className="lg:w-2/3 w-full rounded">
          <AlbumList
            albums={[...albums]}
            paginationInfo={albumPaginationInfo}
          />
        </div>
        <div className="lg:w-1/3 rounded md:inline hidden">
          <div className="w-full font-bold text-2xl text-center rounded bg-green-500 text-black p-1 mb-2 select-none cursor-default">
            Popular Reviews
          </div>
          <PopularReviewList popularReviews={popularReviews} />
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
