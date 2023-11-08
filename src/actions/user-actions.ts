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
import { isErrorResponse } from "../services/axios";

export const loginAction = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  if (!username.trim() || !password.trim()) return;
  const data = await loginService(username, password);
  const error = isErrorResponse(data);
  if (error) throw Error(error.errors[0]);
  const user: User = data as User;
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
  const data = await registerService(username, password);
  const error = isErrorResponse(data);
  if (error) throw Error(error.errors[0]);
  const user: User = data as User;
  localStorage.setItem("loggedInUntil", moment().add(1, "week").toISOString());
  dispatch({
    type: register,
    payload: user,
  });
};

export const logoutAction = async (dispatch: AppDispatch) => {
  const res = await logoutService();
  const loggedOut = res === "OK";
  if (!loggedOut) throw Error("An unexpected error occurred");
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
  const data = await isLoggedInService();
  const error = isErrorResponse(data);
  if (error) throw Error(error.errors[0]);
  const res = data as LoggedInResponse;
  dispatch({
    type: loggedIn,
    payload: res,
  });
};
