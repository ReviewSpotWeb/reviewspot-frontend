import moment from "moment";
import { AppDispatch } from "../components/util/redux/store";
import { loggedIn, login, logout, register } from "../reducers/user-reducer";
import {
  isLoggedInService,
  loginService,
  logoutService,
  registerService,
} from "../services/auth-services";
import { User } from "../types/user";

export const loginAction = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  if (!username.trim() || !password.trim()) return;
  const user: User = await loginService(username, password);
  localStorage.setItem("loggedInUntil", moment().add(1, "week").toISOString());
  dispatch({
    type: login,
    payload: user,
  });
};

export const registerAction = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  if (!username.trim() || !password.trim()) return;
  const user: User = await registerService(username, password);
  localStorage.setItem("loggedInUntil", moment().add(1, "week").toISOString());
  dispatch({
    type: register,
    payload: user,
  });
};

export const logoutAction = async (dispatch: AppDispatch) => {
  const res = await logoutService();
  const loggedOut = res === "OK";
  localStorage.removeItem("loggedInUntil");
  dispatch({
    type: logout,
    payload: loggedOut,
  });
};

export type LoggedInResponse = {
  loggedIn: boolean;
  userInfo?: User;
};
export const isLoggedInAction = async (dispatch: AppDispatch) => {
  const res: LoggedInResponse = await isLoggedInService();
  dispatch({
    type: loggedIn,
    payload: res,
  });
};
