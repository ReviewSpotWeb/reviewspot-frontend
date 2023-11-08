// import axios from "axios";
import { CommentList } from "../types/comment";
import { PageInfo } from "../types/pagination";
import { app } from "./axios";

export const findReviewComments = async (
  reviewId: string,
  albumId: string,
  pageInfo: PageInfo
): Promise<CommentList> => {
  const res = app.get(`/album/${albumId}/review/${reviewId}/comments`, {
    params: pageInfo,
  });
  return (await res).data;
};

export const createComment = async (
  albumId: string,
  reviewId: string,
  comment: string
): Promise<Comment> => {
  const res = await app.post(`/album/${albumId}/review/${reviewId}/comment`, {
    content: comment,
  });
  return res.data.newComment;
};

export const removeComment = async (
  albumId: string,
  reviewId: string,
  commentId: string
): Promise<boolean> => {
  const res = await app.delete(
    `/album/${albumId}/review/${reviewId}/comment/${commentId}`
  );
  return res.data === "OK";
};
