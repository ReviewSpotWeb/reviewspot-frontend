// import axios from "axios";
import albumsJson from "../data/albums.json";
import { Album } from "../types/album";

export const findAlbum = async (albumId: string): Promise<Album> => {
  //   const response = await axios.get(`${API_BASE}/album/${albumId}`);
  //   return response.data;
  return albumsJson.find((album) => album.id === albumId) as never;
};

// Albums to display on home page
export const findHomeAlbums = async (): Promise<Album[]> => {
  //   const response = await axios.get(`${API_BASE}/newReleases`, {
  //     params: { limit: 10, offset: 0 },
  //   });
  //   return response.data;
  return albumsJson as never[];
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
