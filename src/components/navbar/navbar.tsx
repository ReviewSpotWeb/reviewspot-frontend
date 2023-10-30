import { Link } from "react-router-dom";
import SearchBar from "../search/search-bar";

const Navbar = () => {
  return (
    <div className="w-full p-5 bg-gray-400 rounded">
      <div className="flex justify-between items-center text-lg text-black">
        <Link to={"/"}>ReviewSpot</Link>
        <SearchBar />
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};
export default Navbar;
