import { Comment } from "../../types/comment";
import usersJson from "../../data/users.json";
import { User } from "../../types/user";
import ProfilePicture from "../user/profile-picture";
import { Link } from "react-router-dom";

const CommentListItem = ({ comment }: { comment: Comment }) => {
  const commenter: User = usersJson.filter(
    (user) =>
      user.username.toLowerCase() ===
      comment.authorInfo.authorName.toLowerCase()
  )[0] as never;

  return (
    <li className="bg-[#404040] rounded p-2 text-gray-300 h-30 w-full">
      <div className="w-full h-full flex gap-2">
        <div className="flex flex-col ga gap-1">
          <Link to={`/user/${commenter.username.toLowerCase()}`}>
            <div className="h-max w-full border-2 border-[#202020] rounded flex justify-center items-center font-bold bg-[#303030] hover:border-blue-500">
              {commenter.username}
            </div>
          </Link>
          <Link to={`/user/${commenter.username.toLowerCase()}`}>
            <div
              className="border-4 rounded border-[#202020] bg-[#303030] h-full hover:border-blue-500"
              title={commenter.username}
            >
              <ProfilePicture userId={commenter.username} />
            </div>
          </Link>
        </div>
        <div className="w-full">
          <div className="h-full w-full bg-[#303030] p-2 rounded cursor-default flex justify-center items-center text-center">
            {/* <div className="line-clamp-5 lg:line-clamp-3 xl:line-clamp-4">
              {comment.content}
            </div> */}
            {comment.content}
          </div>
        </div>
      </div>
    </li>
  );
};
export default CommentListItem;
