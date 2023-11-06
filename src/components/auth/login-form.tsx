import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../helpers/toast-helpers";

type LoginInfo = {
  username: string;
  password: string;
};
const LoginForm = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  // TODO: Get from state
  const loggedIn = false;
  useEffect(() => {
    // redirect if already logged in
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  const handleLogin = () => {
    if (!loginInfo.username.trim()) {
      showToastMessage({ message: "Username cannot be blank!" });
      return;
    }
    if (!loginInfo.password.trim()) {
      showToastMessage({ message: "Password cannot be blank!" });
      return;
    }
    // TODO: login
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="text-2xl font-bold">Login</div>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="px-2"
          value={loginInfo.username}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, username: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="px-2"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />
      </div>
      <button
        className="border-2 rounded border-[#333] px-1 font-bold bg-blue-500 hover:bg-blue-600 text-black text-xl"
        onClick={() => handleLogin()}
      >
        Login
      </button>
    </div>
  );
};
export default LoginForm;
