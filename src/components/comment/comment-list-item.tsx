import { Comment } from "../../types/comment";
import { User, UserProfile } from "../../types/user";
import ProfilePicture from "../user/profile-picture";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch } from "../util/redux/store";
import { useDispatch } from "react-redux";
import { findUserProfile } from "../../services/profile-services";
import { DeleteIcon } from "../util/icons";
import { useAppSelector } from "../util/redux/hooks";
import { removeCommentAction } from "../../actions/comments-actions";
import { isErrorResponse } from "../../services/axios";
import { showToastMessage } from "../../helpers/toast-helpers";

const CommentListItem = ({ comment }: { comment: Comment }) => {
  const dispatch: AppDispatch = useDispatch();
  const { albumId, reviewId } = useParams();
  const [commenter, setCommenter] = useState<User | null>(null);

  const commenterId = comment.authorInfo.authorName;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!commenterId) return;
      const res = await findUserProfile(commenterId);
      const error = isErrorResponse(res);
      if (error) throw Error(error.errors[0]);
      const userProfile = res as UserProfile;
      setCommenter(userProfile.userInfo);
    };
    fetchUserProfile();
  }, [commenterId, dispatch]);

  // Can delete comment if commenter
  const user = useAppSelector((state) => state.user.user);
  const username = user.username;
  const userIsAuthor = username === commenter?.username.toLowerCase();

  const handleDeleteComment = () => {
    if (!albumId || !reviewId) return;
    removeCommentAction(dispatch, albumId, reviewId, comment._id).catch(
      (error) => showToastMessage({ message: error.message })
    );
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
