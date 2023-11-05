import { useState } from "react";
import { showToastMessage } from "../../helpers/toast-helpers";
import { ToastInfo } from "../../helpers/toast-helpers";
import { ClearSearchIcon, SearchIcon } from "../util/icons";
import { useNavigate } from "react-router-dom";
import { setActive } from "../../reducers/tab-reducer";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    const search = searchTerm.trim();
    if (!search.length) {
      const toastInfo: ToastInfo = {
        message: "Invalid search term",
        theme: "dark",
        position: "top-right",
      };
      showToastMessage(toastInfo);
      setSearchTerm("");
      return;
    }
    dispatch({
      type: setActive,
      payload: 0,
    });
    navigate(`/search?q=${search}`);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="h-max h-10 w-64 border-2 border-[#202020] rounded">
      <div className="flex relative">
        <button
          className="bg-blue-500 hover:bg-blue-600 px-2 text-sm font-bold w-max flex justify-center items-center"
          onClick={() => handleSearch(searchTerm)}
        >
          <SearchIcon />
        </button>
        <div className="w-full h-full relative">
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="w-full p-1 px-2 outline-0 text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute top-1.5 right-1">
              <ClearSearchIcon onClick={() => handleClearSearch()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
