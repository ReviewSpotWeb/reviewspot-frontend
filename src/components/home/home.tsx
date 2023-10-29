import albumsJson from "../../data/albums.json";
import reviewsJson from "../../data/reviews.json";
import AlbumList from "../album/album-list";
import { Album } from "../../types/album";
import Tabs, { TabInfo } from "../util/tabs";
import ReviewList from "../review/review-list";
import { Review } from "../../types/review";

const Home = () => {
  const albums: Album[] = albumsJson as never[];
  const reviews: Review[] = reviewsJson as never[];
  const tabs: TabInfo[] = [
    {
      key: "albums",
      label: "Albums",
      children: <AlbumList albums={albums} />,
    },
    {
      key: "reviews",
      label: "Reviews",
      children: <ReviewList reviews={reviews} />,
    },
  ];

  return (
    <div>
      <div className="lg:hidden">
        <Tabs tabs={tabs} />
      </div>
      <div className="justify-between gap-3 hidden lg:flex">
        <div className="lg:w-2/3 w-full rounded">
          <AlbumList albums={albums} />
        </div>
        <div className="lg:w-1/3 rounded md:inline hidden">
          <div className="w-full font-bold text-2xl text-center rounded bg-green-500 text-black p-1 mb-2 select-none cursor-default">
            Recent Reviews
          </div>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
};
export default Home;
