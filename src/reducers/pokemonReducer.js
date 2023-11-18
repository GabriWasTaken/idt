import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "video",
  initialState: {
    title: "",
    serieId: "",
    cover: "",
    videoId: "",
    episodes: [],
  },
  reducers: {
    videoTitle: (state, action) => {
      state.title = action.payload.title;
      state.serieId = action.payload.serieId;
      state.cover = action.payload.cover;
      state.videoId = action.payload.videoId;
      state.episodes = action.payload.episodes;
    },
  },
});

export const { videoTitle } = pokemonSlice.actions;

export default pokemonSlice.reducer;
