import { User } from "./user";

interface Rating {
  rater: User;
  albumId: string;
  rating: number;
}

export interface Review {
  authorInfo: {
    authorName: string;
    authorRole: string;
  };
  albumId: string;
  content: string;
  numComments: number;
  likedBy: User[];
  rating: Rating;
}
