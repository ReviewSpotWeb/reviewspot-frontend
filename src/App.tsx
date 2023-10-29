import ReviewSpot from "./components/reviewspot";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/error/error-page";
import Home from "./components/home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";
import AlbumPage from "./components/album/album-page";
import ReviewPage from "./components/review/review-page";
import ProfilePage from "./components/user/profile-page";

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
        path: "album/:id",
        element: <AlbumPage />,
      },
      {
        path: "review/:id",
        element: <ReviewPage />,
      },
      {
        path: "user/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
