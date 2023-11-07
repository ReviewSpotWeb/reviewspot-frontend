import { User } from "../types/user";
import { app } from "./axios";

export const loginService = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await app.post("/auth/login", {
    username: username,
    password: password,
  });
  return response.data;
};

export const registerService = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await app.post("/auth/register", {
    username: username,
    password: password,
  });
  //   TODO: Check status codes
  return response.data;
};

export const logoutService = async (): Promise<string> => {
  const response = await app.post("/auth/logout");
  //   TODO: Check status codes
  return response.data;
};

export const isLoggedInService = async (): Promise<User> => {
  const response = await app.get("/auth/isLoggedIn");
  //   TODO: Check status codes
  return response.data;
};
