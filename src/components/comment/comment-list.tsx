import { Comment } from "../../types/comment";
import CommentListItem from "./comment-list-item";
const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul className="w-full flex flex-col gap-2 rounded">
      {comments.length > 0 &&
        comments.map((comment, idx) => (
          <CommentListItem comment={{ ...comment }} key={idx} />
        ))}
    </ul>
  );
};
export default CommentList;
