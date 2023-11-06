import { Comment } from "../../types/comment";
import { User } from "../../types/user";
import ProfilePicture from "../user/profile-picture";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { findUser } from "../../services/user-services";
import { DeleteIcon } from "../util/icons";

const CommentListItem = ({ comment }: { comment: Comment }) => {
  const dispatch: AppDispatch = useDispatch();
  const [commenter, setCommenter] = useState<User | null>(null);

  const commenterId = comment.authorInfo.authorName;

  useEffect(() => {
    if (!commenterId) return;
    findUser(commenterId).then((user) => setCommenter(user));
  }, [commenterId, dispatch]);

  // Can delete comment if commenter
  // TODO: Get from state
  const username = "bob";
  const userIsAuthor = username === commenter?.username.toLowerCase();

  const handleDeleteComment = () => {
    console.log("delete comment");
    // TODO: Delete comment
  };

  return (
    <li className="bg-[#404040] rounded p-2 text-gray-300 h-30 w-full relative">
      {!commenter ? (
        <div className="text-center">Loading...</div>
      ) : (
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
      )}
      {userIsAuthor && (
        <div
          className="absolute right-4 top-4 cursor-pointer fill-current hover:text-red-500"
          onClick={() => handleDeleteComment()}
        >
          <DeleteIcon />
        </div>
      )}
    </li>
  );
};
export default CommentListItem;
