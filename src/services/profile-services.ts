import { UserProfile } from "../types/user";
import { app } from "./axios";

// TODO: Replace w real requests

export const findUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await app.get(`/user/${userId}`);
  return response.data;
};
