import { useEffect, useState } from "react";
import AlbumList from "../album/album-list";
import { Album } from "../../types/album";
import Tabs, { TabInfo } from "../util/tabs";
import ReviewList from "../review/review-list";
import { useAppSelector } from "../util/redux/hooks";
import { findHomeReviewsAction } from "../../actions/reviews-actions";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";

const Home = () => {
  const stateAlbums = useAppSelector((state) => state.albums.albums);
  const [albums, setAlbums] = useState<Album[]>(stateAlbums);
  const reviews = useAppSelector((state) => state.reviews.reviews);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    findHomeReviewsAction(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setAlbums(stateAlbums);
  }, [stateAlbums]);

  const tabs: TabInfo[] = [
    {
      key: "albums",
      label: "Albums",
      children: <AlbumList albums={[...albums]} />,
    },
    {
      key: "reviews",
      label: "Reviews",
      children: <ReviewList reviews={[...reviews]} />,
    },
  ];

  return (
    <div>
      <div className="lg:hidden">
        <Tabs tabs={tabs} />
      </div>
      <div className="justify-between gap-3 hidden lg:flex">
        <div className="lg:w-2/3 w-full rounded">
          <AlbumList albums={[...albums]} />
        </div>
        <div className="lg:w-1/3 rounded md:inline hidden">
          <div className="w-full font-bold text-2xl text-center rounded bg-green-500 text-black p-1 mb-2 select-none cursor-default">
            Recent Reviews
          </div>
          <ReviewList reviews={[...reviews]} />
        </div>
      </div>
    </div>
  );
};
export default Home;
