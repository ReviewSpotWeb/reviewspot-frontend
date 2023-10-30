import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../search/search-bar";
import { AppDispatch } from "../util/redux/store";
import { findHomeAlbumsAction } from "../../actions/albums-actions";
import { useAppDispatch } from "../util/redux/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  // TODO: Move somewhere that makes more sense
  // - just want to findHomeAlbumsAction on first app load, not every time we go to home page
  useEffect(() => {
    findHomeAlbumsAction(dispatch);
  }, [dispatch]);

  const handleLinkHome = () => {
    findHomeAlbumsAction(dispatch);
    navigate("/");
  };

  return (
    <div className="w-full p-5 bg-gray-400 rounded">
      <div className="flex justify-between items-center text-lg text-black">
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
