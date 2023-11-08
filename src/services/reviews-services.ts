// import axios from "axios";
import { UserReview } from "../components/review/review-form";
import { FoundReview } from "../reducers/reviews-reducer";
import { ErrorResponse } from "../types/error";
import { PageInfo } from "../types/pagination";
import { PopularReview, Review, ReviewList } from "../types/review";
import { app } from "./axios";
import { isAxiosError } from "axios";

export const findReview = async (
  reviewId: string,
  albumId: string
): Promise<FoundReview | ErrorResponse> => {
  try {
    const response = await app.get(`album/${albumId}/review/${reviewId}`);
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

// Reviews to display on home page
export const findHomeReviews = async (): Promise<
  PopularReview[] | ErrorResponse
> => {
  try {
    const response = await app.get("popularReviews");
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const findAlbumReviews = async (
  albumId: string,
  pageInfo: PageInfo
): Promise<ReviewList | ErrorResponse> => {
  try {
    const response = await app.get(`/album/${albumId}/reviews`, {
      params: pageInfo,
    });
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const findUserReviews = async (
  userId: string,
  pageInfo: PageInfo
): Promise<ReviewList | ErrorResponse> => {
  try {
    const response = await app.get(`/user/${userId}/reviews`, {
      params: pageInfo,
    });
    return response.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const createReview = async (
  review: UserReview,
  albumId: string
): Promise<Review | ErrorResponse> => {
  try {
    const res = await app.post(`album/${albumId}/review`, {
      ...review,
    });
    return res.data;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const editReview = async (
  review: UserReview,
  albumId: string,
  reviewId: string
): Promise<Review | ErrorResponse> => {
  try {
    const res = await app.put(`album/${albumId}/review/${reviewId}`, {
      ...review,
    });
    return res.data.updatedReview;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const removeReview = async (
  albumId: string,
  reviewId: string
): Promise<boolean | ErrorResponse> => {
  try {
    const res = await app.delete(`album/${albumId}/review/${reviewId}`);
    return res.data === "OK";
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const likeReview = async (
  albumId: string,
  reviewId: string
): Promise<Review | ErrorResponse> => {
  try {
    const res = await app.post(`album/${albumId}/review/${reviewId}/like`);
    return res.data.updatedReview;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};
