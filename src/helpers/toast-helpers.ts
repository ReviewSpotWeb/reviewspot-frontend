import { toast, ToastPosition, Theme } from "react-toastify";

export type ToastInfo = {
  message: string;
  position?: ToastPosition;
  theme?: Theme;
  autoClose?: number;
};

export const showToastMessage = (toastInfo: ToastInfo) => {
  toast.error(toastInfo.message, {
    position: toastInfo.position ?? toast.POSITION.TOP_RIGHT,
    theme: toastInfo.theme ?? "dark",
    autoClose: toastInfo.autoClose ?? 2000,
    pauseOnHover: false,
  });
};
