import { ToastPosition } from "react-toastify";
import { ToastInfo, showToastMessage } from "./toast-helpers";

export const loginToast = (message: string, position: ToastPosition) => {
  const toastInfo: ToastInfo = {
    message: message,
    theme: "dark",
    position: position,
  };
  showToastMessage(toastInfo);
};
