import { PageInfo } from "./pagination";
import { Role } from "./user";

export interface Comment {
  _id: string;
  authorInfo: {
    authorId: string;
    authorName: string;
    authorRole: Role;
  };
  content: string;
  reviewId: string;
}

export type CommentList = {
  comments: Comment[];
  limit: number;
  offset: number;
  total: number;
  next: PageInfo | null;
  prev: PageInfo | null;
};
