import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonReducer";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});
