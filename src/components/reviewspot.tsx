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
    <div className="min-h-screen w-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full my-3 mx-10">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ReviewSpot;
