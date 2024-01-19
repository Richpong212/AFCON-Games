import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const apiMatchesSlice = createSlice({
  name: "apiMatches",
  initialState: {
    matches: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get all matches
    getMatchesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMatchesSuccess: (state, { payload }: PayloadAction<any>) => {
      state.matches = payload;
      state.isFetching = false;
      state.error = false;
    },
    getMatchesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getMatchesStart, getMatchesSuccess, getMatchesFailure } =
  apiMatchesSlice.actions;

export default apiMatchesSlice.reducer;
