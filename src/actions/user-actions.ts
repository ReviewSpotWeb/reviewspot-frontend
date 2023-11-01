import { findUser } from "../services/user-services";
import { find } from "../reducers/user-reducer";
import { AppDispatch } from "../components/util/redux/store";

export const findUserAction = async (dispatch: AppDispatch, userId: string) => {
  if (!userId) return;
  const user = await findUser(userId);
  dispatch({
    type: find,
    payload: user,
  });
};
