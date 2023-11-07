import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/navbar";

const ReviewSpot = () => {
  return (
    <div className="min-h-screen min-w-screen w-full h-full font-mono flex justify-center scroll-smooth">
      <div className="xl:w-3/4 w-11/12 p-2">
        <div className="z-10">
          <Navbar />
        </div>
        <div className="pt-2 z-0">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default ReviewSpot;
