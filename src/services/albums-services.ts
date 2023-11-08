// import axios from "axios";
import { Album, AlbumList } from "../types/album";
import { PageInfo } from "../types/pagination";
import { app } from "./axios";

export const findAlbum = async (albumId: string): Promise<Album> => {
  const response = await app.get(`/album/${albumId}`);
  return response.data.album;
};

// Albums to display on home page
export const findHomeAlbums = async (
  pageInfo: PageInfo
): Promise<AlbumList[]> => {
  const response = await app.get("/newReleases", {
    params: pageInfo,
  });
  return response.data;
};

export const findSearchAlbums = async (
  searchTerm: string,
  pageInfo: PageInfo
): Promise<AlbumList[]> => {
  const response = await app.get("/search", {
    params: { q: searchTerm, ...pageInfo },
  });
  return response.data;
};
