// import axios from "axios";
import usersJson from "../data/users.json";
import { User } from "../types/user";

// TODO: Replace w real requests

export const findUser = async (userId: string): Promise<User> => {
  return usersJson.find(
    (user) => user.username.toLowerCase() === userId.toLowerCase()
  ) as never;
};
