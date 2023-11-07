import axios from "axios";
import { API_BASE } from "../lib/constants";

export const app = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
