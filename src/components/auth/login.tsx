import { Link } from "react-router-dom";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <div className="w-full h-max">
      <div className="bg-[#444] rounded p-2 flex flex-col gap-2 justify-center items-center">
        <LoginForm />
        <hr className="border-2 rounded w-full border-[#222]" />
        <Link to={"/register"}>
          <button className="border-2 rounded border-[#333] px-1 font-bold bg-green-500 hover:bg-green-600 text-black text-xl">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Login;
