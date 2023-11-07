// import axios from "axios";
import albumsJson from "../data/albums.json";
import { Album, AlbumList } from "../types/album";
import { PaginationInfo } from "../types/pagination";
import { app } from "./axios";

export const findAlbum = async (albumId: string): Promise<Album> => {
  //   const response = await axios.get(`${API_BASE}/album/${albumId}`);
  //   return response.data;
  const response = await app.get(`/album/${albumId}`);
  return response.data.album;
};

// Albums to display on home page
export const findHomeAlbums = async (
  paginationInfo: PaginationInfo
): Promise<AlbumList[]> => {
  const response = await app.get("/newReleases", {
    params: paginationInfo,
  });
  return response.data;
};

export const findSearchAlbums = async (
  searchTerm: string
): Promise<Album[]> => {
  //   const response = await axios.get(`${API_BASE}/search`, {
  //     params: { q: searchTerm, limit: 10, offset: 0 },
  //   });
  //   return response.data;
  console.log(searchTerm);
  return [albumsJson[Math.floor(Math.random() * albumsJson.length)]] as never[];
};
