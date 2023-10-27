import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/navbar";

const ReviewSpot = () => {
  // TODO: toast example
  // const showToastMessage = () => {
  //   toast.success("Success Notification !", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };
  return (
    <div className="min-h-screen min-w-screen w-full h-full font-mono relative">
      <Navbar />
      <div className="flex justify-center w-full">
        <div className="p-2 xl:w-4/5 w-full">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ReviewSpot;
