import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../helpers/toast-helpers";
import { useAppSelector } from "../util/redux/hooks";
import { registerAction } from "../../actions/user-actions";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";

type RegisterInfo = {
  username: string;
  password: string;
  confirm: string;
};
const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    username: "",
    password: "",
    confirm: "",
  });

  // TODO: Need to use isLoggedIn endpoint for this
  const loggedIn = useAppSelector((state) => state.user.user.loggedIn);
  useEffect(() => {
    // redirect if already logged in
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  //   TODO: Enforce some rules here
  const handleRegister = () => {
    if (!registerInfo.username.trim()) {
      showToastMessage({ message: "Username cannot be blank!" });
      return;
    }
    if (!registerInfo.password.trim()) {
      showToastMessage({ message: "Password cannot be blank!" });
      return;
    }
    if (registerInfo.password !== registerInfo.confirm) {
      showToastMessage({ message: "Passwords do not match!" });
      return;
    }
    // TODO: test
    registerAction(dispatch, registerInfo.username, registerInfo.password);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="text-2xl font-bold">Register</div>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="px-2"
          value={registerInfo.username}
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, username: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="px-2"
          value={registerInfo.password}
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, password: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="px-2"
          value={registerInfo.confirm}
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, confirm: e.target.value })
          }
        />
      </div>
      <button
        className="border-2 rounded border-[#333] px-1 font-bold bg-green-500 hover:bg-green-600 text-black text-xl"
        onClick={() => handleRegister()}
      >
        Register
      </button>
    </div>
  );
};
export default RegisterForm;
