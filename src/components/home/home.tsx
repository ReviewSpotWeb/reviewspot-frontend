import albumsJson from "../../data/albums.json";
import AlbumList from "../album/album-list";
import { Album } from "../../types/album";
import Tabs, { TabInfo } from "../util/tabs";

const Home = () => {
  const albums: Album[] = albumsJson as never[];
  const tabs: TabInfo[] = [
    {
      key: "albums",
      label: "Albums",
      children: <AlbumList albums={albums as Album[]} />,
    },
    {
      key: "reviews",
      label: "Reviews",
      children: <div>ReviewList</div>,
    },
  ];

  return (
    <div>
      <div className="lg:hidden">
        <Tabs tabs={tabs} />
      </div>
      <div className="justify-between gap-3 hidden lg:flex">
        {/* border-pink-200 rounded animate-[pulse_30s_ease-in-out_infinite] */}
        <div className="lg:w-2/3 w-full bg-[#303030]">
          <AlbumList albums={albums as Album[]} />
        </div>
        <div className="lg:w-1/3 bg-[#303030] rounded md:inline hidden">
          ReviewList
        </div>
      </div>
    </div>
  );
};
export default Home;
