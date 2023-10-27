import { PropsWithChildren } from "react";

type PaginationButtonProps = {
  onClick: () => void;
};

const PaginationButton = (props: PropsWithChildren<PaginationButtonProps>) => {
  return (
    <div
      onClick={() => props.onClick}
      className="w-12 h-8 flex justify-center items-center bg-gray-600 hover:bg-gray-700 active:bg-gray-800 cursor-pointer select-none rounded"
    >
      {props.children}
    </div>
  );
};
export default PaginationButton;
