import { useState } from "react";
import albumsJson from "../../data/albums.json";
import AlbumList from "../album/album-list";
import { Album } from "../../types/album";

enum TabState {
  ALBUMS = "ALBUMS",
  REVIEWS = "REVIEWS",
}

const Home = () => {
  const [tab, setTab] = useState<TabState>(TabState.ALBUMS);

  const handleChangeTab = (tabState: TabState) => {
    setTab(tabState);
  };

  const albums: Album[] = albumsJson as never[];

  return (
    <div className="">
      <div className="md:hidden">
        <div className="ms-3 flex gap-3">
          <div
            onClick={() => handleChangeTab(TabState.ALBUMS)}
            className={`border-4 border-b-0 border-transparent rounded-t p-1 px-3 bg-[#303030] text-gray-300 font-bold select-none ${
              tab === TabState.ALBUMS
                ? "bg-[#202020] border-[#303030]"
                : "cursor-pointer"
            }`}
          >
            Albums
          </div>
          <div
            onClick={() => handleChangeTab(TabState.REVIEWS)}
            className={`border-4 border-b-0 border-transparent rounded-t p-1 px-3 bg-[#303030] text-gray-300 font-bold select-none ${
              tab === TabState.REVIEWS
                ? "bg-[#202020] border-[#303030]"
                : "cursor-pointer"
            }`}
          >
            Reviews
          </div>
        </div>
        <div>
          {tab === TabState.ALBUMS && (
            <div className="bg-[#303030] rounded">
              <AlbumList albums={albums as Album[]} />
            </div>
          )}
          {tab === TabState.REVIEWS && (
            <div className="bg-[#303030] rounded">ReviewList</div>
          )}
        </div>
      </div>
      <div className="justify-between gap-3 hidden md:flex">
        {/* border-pink-200 rounded animate-[pulse_30s_ease-in-out_infinite] */}
        <div className="lg:w-2/3 md:w-3/4 w-full bg-[#303030]">
          <AlbumList albums={albums as Album[]} />
        </div>
        <div className="lg:w-1/3 md:w-1/4 bg-[#303030] rounded md:inline hidden">
          ReviewList
        </div>
      </div>
    </div>
  );
};
export default Home;
