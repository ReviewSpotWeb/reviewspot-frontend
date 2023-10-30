import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TabState {
  activeIdx: number;
}

const initialState: TabState = {
  activeIdx: 0,
};

export const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number>) => {
      state.activeIdx = action.payload;
    },
  },
});

export const { setActive } = activeTabSlice.actions;

export default activeTabSlice.reducer;
