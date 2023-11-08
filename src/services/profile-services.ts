import { ErrorResponse } from "../types/error";
import { UserProfile } from "../types/user";
import { app } from "./axios";
import { isAxiosError } from "axios";

export const findUserProfile = async (
  userId: string
): Promise<UserProfile | ErrorResponse> => {
  try {
    const response = await app.get(`/user/${userId}`);
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
