import { PropsWithChildren } from "react";

const IconChip = (props: PropsWithChildren) => {
  return (
    <div className="whitespace-pre px-2 py-1 bg-[#303030] rounded border border-transparent hover:border-blue-500 flex items-center justify-center select-none cursor-default">
      {props.children}
    </div>
  );
};
export default IconChip;
