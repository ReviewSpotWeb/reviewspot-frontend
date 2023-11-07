import {
  findAlbum,
  findHomeAlbums,
  findSearchAlbums,
} from "../services/albums-services";

import { find, findHome, findSearch } from "../reducers/albums-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { PaginationInfo } from "../types/pagination";

export const findAlbumAction = async (
  dispatch: AppDispatch,
  albumId: string
) => {
  if (!albumId) return;
  const album = await findAlbum(albumId);
  dispatch({
    type: find,
    payload: album,
  });
};

export const findHomeAlbumsAction = async (
  dispatch: AppDispatch,
  paginationInfo: PaginationInfo = { offset: 0, limit: 10 }
) => {
  const albumList = await findHomeAlbums(paginationInfo);
  dispatch({
    type: findHome,
    payload: albumList,
  });
};

export const findSearchAlbumsAction = async (
  dispatch: AppDispatch,
  searchTerm: string,
  paginationInfo: PaginationInfo = { offset: 0, limit: 10 }
) => {
  const albumList = await findSearchAlbums(searchTerm, paginationInfo);
  dispatch({
    type: findSearch,
    payload: albumList,
  });
};
