import { ErrorResponse } from "../types/error";
import { User } from "../types/user";
import { app } from "./axios";
import { isAxiosError } from "axios";

export const loginService = async (
  username: string,
  password: string
): Promise<User | ErrorResponse> => {
  try {
    const response = await app.post("/auth/login", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const registerService = async (
  username: string,
  password: string
): Promise<User | ErrorResponse> => {
  try {
    const response = await app.post("/auth/register", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const logoutService = async (): Promise<string> => {
  const response = await app.post("/auth/logout");
  //   TODO: Check status codes
  return response.data;
};

export const isLoggedInService = async (): Promise<User | ErrorResponse> => {
  try {
    const response = await app.get("/auth/isLoggedIn");
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};
