// import axios from "axios";
import commentsJson from "../data/comments.json";
import { Comment } from "../types/comment";

export const findReviewComments = async (
  reviewId: string
): Promise<Comment[]> => {
  return commentsJson.filter(
    (comment) => comment.reviewId === reviewId
  ) as never[];
};
