import { Role } from "../../types/user";

const UserBadge = ({ role }: { role: Role }) => {
  let badge: JSX.Element = <></>;
  switch (role) {
    case Role.GENERAL:
      break;
    case Role.MODERATOR:
      badge = (
        <div className="h-5 w-max mx-1 px-1 flex justify-center items-center border border-slate-400 rounded-full w-max bg-purple-600 font-bold text-slate-200 select-none">
          mod
        </div>
      );
      break;
    default:
      break;
  }
  return <div>{badge}</div>;
};
export default UserBadge;
