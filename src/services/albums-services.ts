// import axios from "axios";
import { Album, AlbumList } from "../types/album";
import { ErrorResponse } from "../types/error";
import { PageInfo } from "../types/pagination";
import { app } from "./axios";
import { isAxiosError } from "axios";

export const findAlbum = async (
  albumId: string
): Promise<Album | ErrorResponse> => {
  try {
    const response = await app.get(`/album/${albumId}`);
    return response.data.album;
  } catch (error) {
    let errResponse: ErrorResponse;
    if (isAxiosError(error)) {
      if (error.response) errResponse = { errors: error.response.data.errors };
      else errResponse = { errors: [error.message] };
    } else errResponse = { errors: ["An unexpected error occurred"] };
    return errResponse;
  }
};

// Albums to display on home page
export const findHomeAlbums = async (
  pageInfo: PageInfo
): Promise<AlbumList[] | ErrorResponse> => {
  try {
    const response = await app.get("/newReleases", {
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

export const findSearchAlbums = async (
  searchTerm: string,
  pageInfo: PageInfo
): Promise<AlbumList[] | ErrorResponse> => {
  try {
    const response = await app.get("/search", {
      params: { q: searchTerm, ...pageInfo },
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
