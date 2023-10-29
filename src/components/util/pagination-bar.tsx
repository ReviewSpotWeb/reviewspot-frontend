import { PropsWithChildren } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

type PaginationButtonProps = {
  onClick: () => void;
};

const PaginationButton = (props: PropsWithChildren<PaginationButtonProps>) => {
  return (
    <div
      onClick={() => props.onClick()}
      className="w-12 h-8 flex justify-center items-center bg-gray-600 hover:bg-gray-700 active:bg-gray-800 cursor-pointer select-none rounded"
    >
      {props.children}
    </div>
  );
};

export type PaginationInfo = {
  prev: boolean;
  next: boolean;
  loadPrev: () => void;
  loadNext: () => void;
};

const PaginationBar = ({
  paginationInfo,
}: {
  paginationInfo: PaginationInfo;
}) => {
  const { prev, next, loadPrev, loadNext } = paginationInfo;
  return (
    <div className="bg-gray-500 flex justify-between p-1 rounded">
      {prev && (
        <PaginationButton onClick={() => loadPrev()}>
          <div className="w-full flex justify-center">
            <ArrowLeftIcon />
          </div>
        </PaginationButton>
      )}
      {next && (
        <PaginationButton onClick={() => loadNext()}>
          <div className="w-full flex justify-center">
            <ArrowRightIcon />
          </div>
        </PaginationButton>
      )}
    </div>
  );
};
export default PaginationBar;
