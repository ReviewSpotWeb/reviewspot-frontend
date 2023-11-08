import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div className="flex flex-col justify-center items-center">
        <div id="error-page" className="text-center p-5">
          <h1>Oops! {error.status}</h1>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </div>
        <Link
          to={"/"}
          className="border-2 rounded p-2 bg-[#333] hover:bg-[#444]"
        >
          Home
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-center p-5">
          <h1>Oops! Unexpected Error</h1>
          <p>Something went wrong.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
        <Link
          to={"/"}
          className="border-2 rounded p-2 bg-[#333] hover:bg-[#444]"
        >
          Home
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <Link
          to={"/"}
          className="border-2 rounded p-2 bg-[#333] hover:bg-[#444]"
        >
          Home
        </Link>
      </div>
    );
  }
};
export default ErrorPage;
