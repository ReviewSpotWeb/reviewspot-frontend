import { createElement } from "react";
import { MusicalNoteIcon, FireIcon } from "@heroicons/react/24/solid";

const Home = () => {
  createElement(MusicalNoteIcon, {
    className: "w-5 h-5 text-blue-500",
  });
  createElement(FireIcon, {
    className: "w-5 h-5 text-orange-700",
  });
  return (
    <div className="">
      <div className="flex justify-between gap-2">
        <div className="w-2/3 bg-[#303030] rounded border border-pink-200 rounded animate-[pulse_30s_ease-in-out_infinite]">
          AlbumList
        </div>
        <div className="w-1/3 bg-[#303030] rounded border border-pink-200 rounded animate-[pulse_30s_ease-in-out_infinite]">
          ReviewList
        </div>
      </div>
    </div>
  );
};
export default Home;
