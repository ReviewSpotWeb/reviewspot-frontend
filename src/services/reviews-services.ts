// import axios from "axios";
import { UserReview } from "../components/review/write-review-form";
import reviewsJson from "../data/reviews.json";
import { Review } from "../types/review";

// TODO: Replace w real requests

export const findReview = async (reviewId: string): Promise<Review> => {
  return reviewsJson.find((review) => review._id === reviewId) as never;
};

// Reviews to display on home page
export const findHomeReviews = async (): Promise<Review[]> => {
  return reviewsJson as never[];
};

export const findAlbumReviews = async (albumId: string): Promise<Review[]> => {
  return [
    ...reviewsJson.filter((review) => review.albumId === albumId),
  ] as never[];
};

export const findUserReviews = async (userId: string): Promise<Review[]> => {
  return [
    ...reviewsJson.filter(
      (review) => review.authorInfo.authorName.toLowerCase() === userId
    ),
  ] as never[];
};

export const createReview = async (review: UserReview, albumId: string) => {
  // TODO: send POST to server
  console.log(review, albumId);
};
