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
    <div className="min-h-screen min-w-screen w-full h-full font-mono flex justify-center">
      <div className="xl:w-3/4 w-11/12 p-2">
        <Navbar />
        <div className="pt-2">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default ReviewSpot;
