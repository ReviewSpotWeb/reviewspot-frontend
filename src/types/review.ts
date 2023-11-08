import { Album } from "./album";
import { PageInfo } from "./pagination";
import { User } from "./user";

interface Rating {
  rater: User;
  albumId: string;
  rating: number;
}
export interface Review {
  _id: string;
  authorInfo: {
    authorName: string;
    authorRole: string;
  };
  albumId: string;
  content: string;
  numComments: number;
  likedBy: string[];
  rating: Rating;
  albumName?: string;
}

export interface PopularReview {
  review: Review;
  album: Album;
}

export type ReviewList = {
  reviews: Review[];
  limit: number;
  offset: number;
  total: number;
  next: PageInfo | null;
  prev: PageInfo | null;
};
