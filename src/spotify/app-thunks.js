import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSpotifyCurrentSong } from "./app-service";

export const getSpotifyCurrentSongThunk = createAsyncThunk(
  "getSpotifyCurrentSong",
  async () => await getSpotifyCurrentSong()
);
