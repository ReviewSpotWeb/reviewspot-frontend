import { findUserProfile } from "../services/profile-services";
import { find } from "../reducers/profile-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { isErrorResponse } from "../services/axios";
import { UserProfile } from "../types/user";

export const findUserProfileAction = async (
  dispatch: AppDispatch,
  userId: string
) => {
  if (!userId) return;
  const res = await findUserProfile(userId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const user = res as UserProfile;
  dispatch({
    type: find,
    payload: user,
  });
};
