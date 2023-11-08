import {
  findAlbum,
  findHomeAlbums,
  findSearchAlbums,
} from "../services/albums-services";

import { find, findHome, findSearch } from "../reducers/albums-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { PageInfo } from "../types/pagination";
import { isErrorResponse } from "../services/axios";
import { Album, AlbumList } from "../types/album";

export const findAlbumAction = async (
  dispatch: AppDispatch,
  albumId: string
) => {
  if (!albumId) return;
  const res = await findAlbum(albumId);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const album = res as Album;
  dispatch({
    type: find,
    payload: album,
  });
};

export const findHomeAlbumsAction = async (
  dispatch: AppDispatch,
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  const res = await findHomeAlbums(pageInfo);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const albumList = res as AlbumList[];
  dispatch({
    type: findHome,
    payload: albumList,
  });
};

export const findSearchAlbumsAction = async (
  dispatch: AppDispatch,
  searchTerm: string,
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  const res = await findSearchAlbums(searchTerm, pageInfo);
  const error = isErrorResponse(res);
  if (error) throw Error(error.errors[0]);
  const albumList = res as AlbumList[];
  dispatch({
    type: findSearch,
    payload: albumList,
  });
};
