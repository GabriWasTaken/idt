import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    offset: 0,
  },
  reducers: {
    setPokemonOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { setPokemonOffset } = pokemonSlice.actions;

export default pokemonSlice.reducer;
