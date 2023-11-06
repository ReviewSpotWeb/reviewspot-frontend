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

const App = () => {
  // TODO: Check if logged in and get username for profile page
  const userId = "charlie";
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
          path: "user/",
          element: <ProfilePage activeUserId={userId} />,
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
