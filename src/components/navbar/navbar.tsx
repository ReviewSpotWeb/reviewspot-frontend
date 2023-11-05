import { useNavigate } from "react-router-dom";
import SearchBar from "../search/search-bar";
import { AppDispatch } from "../util/redux/store";
import { findHomeAlbumsAction } from "../../actions/albums-actions";
import { useAppDispatch } from "../util/redux/hooks";
import ProfilePicture from "../user/profile-picture";
import { HomeIcon } from "../util/icons";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const handleLinkHome = () => {
    setShowOptions(false);
    findHomeAlbumsAction(dispatch);
    navigate("/");
  };

  // TODO: Get from state
  const loggedIn = 1;
  // TODO: Get this from state
  const username = "alice";

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClickAvatar = () => {
    setShowOptions((prev) => !prev);
  };

  const handleProfile = () => {
    setShowOptions(false);
    navigate(`user/${username.toLowerCase()}`);
  };

  const handleLogout = () => {
    setShowOptions(false);
    // TODO: Handle logout
    console.log("logout");
  };

  const handleLogin = () => {
    // TODO: Handle login
    console.log("login");
  };

  return (
    <div className="w-full p-5 bg-gray-400 rounded relative">
      <div className="flex justify-between items-center text-lg text-black gap-2">
        <div
          onClick={() => handleLinkHome()}
          className="cursor-pointer font-bold flex gap-2 items-center hover:text-blue-700"
        >
          <div className="fill-current">
            <HomeIcon />
          </div>
          <span className="sm:inline hidden">ReviewSpot</span>
        </div>
        <SearchBar />
        {loggedIn ? (
          <div
            className="border-2 border-[#333] hover:border-blue-700 bg-[#777] rounded-full w-max h-max overflow-clip cursor-pointer"
            onClick={() => handleClickAvatar()}
          >
            <div className="w-12 h-12">
              <ProfilePicture userId={username} />
            </div>
          </div>
        ) : (
          <button
            className="border-2 rounded border-[#333] px-1 font-bold bg-blue-500 hover:bg-blue-600"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        )}
        {showOptions && (
          <div className="absolute top-20 right-1 w-20 z-20">
            <div className="flex flex-col text-center border font-bold bg-[#222] text-gray-300">
              <button
                onClick={() => handleProfile()}
                className="border hover:bg-[#333]"
              >
                Profile
              </button>
              <button
                onClick={() => handleLogout()}
                className="border hover:bg-[#333]"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
