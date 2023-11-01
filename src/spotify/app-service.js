import axios from "axios";
import { Buffer } from "buffer";

const MXM_BASE_URL = "https://api.musixmatch.com/ws/1.1";

const getApiKey = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      refresh_token: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN,
      grant_type: "refresh_token",
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`,
          "utf-8"
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

export const getSpotifyCurrentSong = async () => {
  const apiKey = await getApiKey();

  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );
  return response.data;
};

export const getLyrics = async ({ track, artist }) => {
  let url = new URLSearchParams({
    q_track: track,
    q_artist: artist,
    apikey: process.env.REACT_APP_MXM_ACCESS_TOKEN,
  });

  const search = await axios.get(
    `${MXM_BASE_URL}/track.search?${url.toString()}`
  );

  const { track_id } = search.message.body.track_list.track;

  url = new URLSearchParams({
    track_id: track_id,
    apikey: process.env.REACT_APP_MXM_ACCESS_TOKEN,
  });

  const lyrics = await axios.get(
    `${MXM_BASE_URL}/track.search?${url.toString()}`
  );

  return lyrics.message.body.lyrics.lyrics_body;
};
