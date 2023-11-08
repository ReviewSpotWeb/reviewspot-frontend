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
import { findUserProfile } from "./services/profile-services";
import { findUserReviewsAction } from "./actions/reviews-actions";
import { findAlbum } from "./services/albums-services";
import { showToastMessage } from "./helpers/toast-helpers";
import { isErrorResponse } from "./services/axios";
import { Album } from "./types/album";
import { UserProfile } from "./types/user";

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const loggedInUntil = localStorage.getItem("loggedInUntil");
    const loggedIn = loggedInUntil && moment(loggedInUntil) >= moment();
    if (loggedIn)
      isLoggedInAction(dispatch).catch((error) =>
        showToastMessage(error.message)
      );
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
          loader: async ({ params }) => {
            if (!params.albumId)
              throw new Response("No album provided", { status: 400 });
            // Update review state
            await findUserReviewsAction(dispatch, params.userId ?? "").catch(
              (error) => {
                throw Error(error.message);
              }
            );
            const res = await findAlbum(params.albumId);
            const error = isErrorResponse(res);
            if (error) throw Error(error.errors[0]);
            const album = res as Album;
            return album;
          },
        },
        {
          path: "album/:albumId/review/:reviewId",
          element: <ReviewPage />,
        },
        {
          path: "user/:userId",
          element: <ProfilePage />,
          loader: async ({ params }) => {
            if (!params.userId)
              throw new Response("No username provided", { status: 400 });
            // Update review state
            await findUserReviewsAction(dispatch, params.userId ?? "").catch(
              (error) => {
                throw Error(error.message);
              }
            );
            // Return user profile data
            const res = await findUserProfile(params.userId);
            const error = isErrorResponse(res);
            if (error) throw Error(error.errors[0]);
            const userProfile = res as UserProfile;
            return userProfile;
          },
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
