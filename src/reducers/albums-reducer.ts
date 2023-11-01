import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Album } from "../types/album";

interface AlbumState {
  albums: Album[];
}

const initialState: AlbumState = {
  albums: [],
};

export const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    find: (state, action: PayloadAction<Album>) => {
      state.albums = [action.payload];
    },
    findHome: (state, action: PayloadAction<Album[]>) => {
      state.albums = [...action.payload];
    },
    findSearch: (state, action: PayloadAction<Album[]>) => {
      state.albums = [...action.payload];
    },
  },
});

export const { find, findHome, findSearch } = albumSlice.actions;

export default albumSlice.reducer;
