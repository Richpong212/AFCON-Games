import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// get the matches from local storage
const matches = localStorage?.getItem("livescore")
  ? JSON.parse(localStorage?.getItem("livescore") || "")
  : [];

export const apiMatchesSlice = createSlice({
  name: "apiMatches",
  initialState: {
    matches: [matches],
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
      // set the matches to the payload
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
