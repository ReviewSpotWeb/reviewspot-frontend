import { findUser } from "../services/user-services";
import { find } from "../reducers/profile-reducer";
import { AppDispatch } from "../components/util/redux/store";

export const findUserProfileAction = async (
  dispatch: AppDispatch,
  userId: string
) => {
  if (!userId) return;
  const user = await findUser(userId);
  dispatch({
    type: find,
    payload: user,
  });
};
