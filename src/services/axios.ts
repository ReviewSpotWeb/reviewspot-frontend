import axios from "axios";
import { API_BASE } from "../lib/constants";
import { ErrorResponse } from "../types/error";

export const app = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const isErrorResponse = (data: unknown) => {
  if (Object.prototype.hasOwnProperty.call(data, "errors"))
    return data as ErrorResponse;
  return false;
};
