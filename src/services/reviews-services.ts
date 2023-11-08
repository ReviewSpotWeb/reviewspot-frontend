// import axios from "axios";
import { UserReview } from "../components/review/review-form";
import { FoundReview } from "../reducers/reviews-reducer";
import { PageInfo } from "../types/pagination";
import { PopularReview, Review, ReviewList } from "../types/review";
import { app } from "./axios";

export const findReview = async (
  reviewId: string,
  albumId: string
): Promise<FoundReview> => {
  const response = await app.get(`album/${albumId}/review/${reviewId}`);
  return response.data;
};

// Reviews to display on home page
export const findHomeReviews = async (): Promise<PopularReview[]> => {
  const response = await app.get("popularReviews");
  return response.data;
};

export const findAlbumReviews = async (
  albumId: string,
  pageInfo: PageInfo
): Promise<ReviewList> => {
  const response = await app.get(`/album/${albumId}/reviews`, {
    params: pageInfo,
  });
  return response.data;
};

export const findUserReviews = async (
  userId: string,
  pageInfo: PageInfo
): Promise<ReviewList> => {
  const response = await app.get(`/user/${userId}/reviews`, {
    params: pageInfo,
  });
  return response.data;
};

export const createReview = async (review: UserReview, albumId: string) => {
  const res = await app.post(`album/${albumId}/review`, {
    ...review,
  });
  return res.data;
};

export const editReview = async (
  review: UserReview,
  albumId: string,
  reviewId: string
): Promise<Review> => {
  const res = await app.put(`album/${albumId}/review/${reviewId}`, {
    ...review,
  });
  return res.data.updatedReview;
};

export const removeReview = async (
  albumId: string,
  reviewId: string
): Promise<boolean> => {
  const res = await app.delete(`album/${albumId}/review/${reviewId}`);
  return res.data === "OK";
};

export const likeReview = async (
  albumId: string,
  reviewId: string
): Promise<Review> => {
  const res = await app.post(`album/${albumId}/review/${reviewId}/like`);
  return res.data.updatedReview;
};
