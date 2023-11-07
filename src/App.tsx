import ReviewSpot from "./components/reviewspot";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/error/error-page";
import Home from "./components/home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";
import AlbumPage from "./components/album/album-page";
import ReviewPage from "./components/review/review-page";
import ProfilePage from "./components/user/profile-page";
import SearchResults from "./components/search/search-results";
import Register from "./components/auth/register";
import moment from "moment";
import { useEffect } from "react";
import { isLoggedInAction } from "./actions/user-actions";
import { AppDispatch } from "./components/util/redux/store";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const loggedInUntil = localStorage.getItem("loggedInUntil");
    const loggedIn = loggedInUntil && moment(loggedInUntil) >= moment();
    if (loggedIn) isLoggedInAction(dispatch);
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ReviewSpot />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "album/:albumId",
          element: <AlbumPage />,
        },
        {
          path: "review/:reviewId",
          element: <ReviewPage />,
        },
        {
          path: "user/:userId",
          element: <ProfilePage />,
        },
        {
          path: "search/",
          element: <SearchResults />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
