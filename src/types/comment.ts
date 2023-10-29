import { Role } from "./user";

export interface Comment {
  id: string;
  authorInfo: {
    authorId: string;
    authorName: string;
    authorRole: Role;
  };
  content: string;
  reviewId: string;
}
