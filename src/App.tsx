import ReviewSpot from "./components/reviewspot";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/error/error-page";
import Home from "./components/home/home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
