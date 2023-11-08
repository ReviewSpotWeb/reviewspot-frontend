// import axios from "axios";
import { Comment, CommentList } from "../types/comment";
import { ErrorResponse } from "../types/error";
import { PageInfo } from "../types/pagination";
import { app } from "./axios";
import { isAxiosError } from "axios";

export const findReviewComments = async (
  reviewId: string,
  albumId: string,
  pageInfo: PageInfo
): Promise<CommentList | ErrorResponse> => {
  try {
    const res = await app.get(`/album/${albumId}/review/${reviewId}/comments`, {
      params: pageInfo,
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

export const createComment = async (
  albumId: string,
  reviewId: string,
  comment: string
): Promise<Comment | ErrorResponse> => {
  try {
    const res = await app.post(`/album/${albumId}/review/${reviewId}/comment`, {
      content: comment,
    });
    return res.data.newComment;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

export const removeComment = async (
  albumId: string,
  reviewId: string,
  commentId: string
): Promise<boolean | ErrorResponse> => {
  try {
    const res = await app.delete(
      `/album/${albumId}/review/${reviewId}/comment/${commentId}`
    );
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
