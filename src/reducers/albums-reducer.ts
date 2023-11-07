import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Album, AlbumList } from "../types/album";
import { AlbumPaginationInfo } from "../types/pagination";

type AlbumState = {
  albums: Album[];
  paginationInfo: AlbumPaginationInfo;
};

const initialState: AlbumState = {
  albums: [],
  paginationInfo: {
    next: null,
    prev: null,
    // TODO: get these from constants
    page: { offset: 0, limit: 10 },
    total: 0,
  },
};

export const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<Album>) => {
      state = {
        ...initialState,
        albums: [action.payload],
      };
      return state;
    },
    findHome: (state, action: PayloadAction<AlbumList>) => {
      state = {
        albums: [...action.payload.albums],
        paginationInfo: {
          page: { limit: action.payload.limit, offset: action.payload.offset },
          next: action.payload.next,
          prev: action.payload.prev,
          total: action.payload.total,
        },
      };
      return state;
    },
    findSearch: (state, action: PayloadAction<AlbumList>) => {
      state = {
        albums: [...action.payload.albums],
        paginationInfo: {
          page: { limit: action.payload.limit, offset: action.payload.offset },
          next: action.payload.next,
          prev: action.payload.prev,
          total: action.payload.total,
        },
      };
      return state;
    },
  },
});

export const { find, findHome, findSearch } = albumSlice.actions;

export default albumSlice.reducer;
