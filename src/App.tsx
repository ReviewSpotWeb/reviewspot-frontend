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
        path: "search",
        element: <SearchResults />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
