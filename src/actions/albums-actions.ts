import {
  findAlbum,
  findHomeAlbums,
  findSearchAlbums,
} from "../services/albums-services";

import { find, findHome, findSearch } from "../reducers/albums-reducer";
import { AppDispatch } from "../components/util/redux/store";

export const findAlbumAction = async (
  dispatch: AppDispatch,
  albumId: string
) => {
  const album = await findAlbum(albumId);
  dispatch({
    type: find,
    payload: album,
  });
};

export const findHomeAlbumsAction = async (dispatch: AppDispatch) => {
  const albums = await findHomeAlbums();
  dispatch({
    type: findHome,
    payload: albums,
  });
};

export const findSearchAlbumsAction = async (
  dispatch: AppDispatch,
  searchTerm: string
) => {
  const albums = await findSearchAlbums(searchTerm);
  dispatch({
    type: findSearch,
    payload: albums,
  });
};
