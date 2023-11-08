import { useState } from "react";
import { showToastMessage } from "../../helpers/toast-helpers";

type CommentFormProps = {
  onSave: (comment: string) => void;
  onCancel: () => void;
};

const CommentForm = (commentFormProps: CommentFormProps) => {
  const { onSave, onCancel } = commentFormProps;
  const [userComment, setUserComment] = useState<string>("");
  const handleSave = () => {
    if (!userComment.trim()) {
      showToastMessage({ message: "Your comment is empty!" });
      return;
    }
    onSave(userComment);
  };

  return (
    <div className="flex justify-center h-max">
      <div className="w-3/4 h-max text-gray-200 flex flex-col gap-2">
        <div className="text-center font-bold text-2xl">Comment</div>
        <div>
          <textarea
            name="review"
            id="review-text"
            className="resize-none px-2 py-1 w-full h-32 rounded bg-[#333] border-2 border-[#222]"
            onChange={(e) => setUserComment(e.target.value)}
            value={userComment}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="w-1/4 border-2 border-[#333] rounded font-bold bg-red-600 hover:bg-red-700 active:bg-red-800"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="w-1/4 border-2 border-[#333] rounded font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
