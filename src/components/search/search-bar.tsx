import { useState } from "react";
import { showToastMessage } from "../../helpers/toast-helpers";
import { ToastInfo } from "../../helpers/toast-helpers";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
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
    setSearchTerm("");
    /* TODO:
    1. Make GET request for search results (Album[])
    2. Set state so that home page can pass in search results as album list
    */
    navigate(`/search?q=${search}`);
  };

  return (
    <div className="h-max w-64 border-2 border-[#202020] rounded">
      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-1 px-2 outline-0 text-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 px-2 text-sm font-bold"
          onClick={() => handleSearch(searchTerm)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
