import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../search/search-bar";
import { AppDispatch } from "../util/redux/store";
import { findHomeAlbumsAction } from "../../actions/albums-actions";
import { useAppDispatch } from "../util/redux/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const handleLinkHome = () => {
    findHomeAlbumsAction(dispatch);
    navigate("/");
  };

  return (
    <div className="w-full p-5 bg-gray-400 rounded">
      <div className="flex justify-between items-center text-lg text-black gap-2">
        <div onClick={() => handleLinkHome()} className="cursor-pointer">
          ReviewSpot
        </div>
        <SearchBar />
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};
export default Navbar;
