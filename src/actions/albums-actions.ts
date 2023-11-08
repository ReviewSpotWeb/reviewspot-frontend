import {
  findAlbum,
  findHomeAlbums,
  findSearchAlbums,
} from "../services/albums-services";

import { find, findHome, findSearch } from "../reducers/albums-reducer";
import { AppDispatch } from "../components/util/redux/store";
import { PageInfo } from "../types/pagination";

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
  pageInfo: PageInfo = { offset: 0, limit: 10 }
) => {
  const albumList = await findHomeAlbums(pageInfo);
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
  const albumList = await findSearchAlbums(searchTerm, pageInfo);
  dispatch({
    type: findSearch,
    payload: albumList,
  });
};
