import { createSlice } from "@reduxjs/toolkit";
import { getSpotifyCurrentSongThunk } from "./app-thunks";

const initialState = {
  currentSong: null,
};

const AppReducer = createSlice({
  name: "app",
  initialState,
  extraReducers: {
    [getSpotifyCurrentSongThunk.fulfilled]: (state, action) => {
      state.currentSong = action.payload;
      console.log(action.payload)
    },
    [getSpotifyCurrentSongThunk.rejected]: (state, action) => {
        console.log("getSpotifyCurrentSongThunk.rejected");
        console.log(action);
    },
  },
});

export default AppReducer.reducer;
