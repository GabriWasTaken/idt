import axios from "axios";

export const getPokemons = (okCallback, koCallback, urlParameters) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}pokemon?offset=${urlParameters.offset}&limit=${urlParameters.LIMIT}`)
    .then((response) => okCallback(response))
    .catch((error) => koCallback(error));
};

export const getPokemonsInfo = (okCallback, koCallback, url, pokemonList) => {
  axios
    .get(`${url}`)
    .then((response) => okCallback(response, pokemonList))
    .catch((error) => koCallback(error));
};
