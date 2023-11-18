import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPokemonsInfo, getEvolutionChain } from "../services/pokemonServices";

const PokemonDetail = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState();
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonsInfo(okCallback, koCallback, `${process.env.REACT_APP_BASE_URL}pokemon${location.pathname}`);
  }, [location]);

  useEffect(() => {
    if (pokemon) {
      getEvolutionChain(
        okEvolutionChainCallback,
        koEvolutionChainCallback,
        `${process.env.REACT_APP_BASE_URL}evolution-chain/${pokemon.id}`
      );
    }
  }, [pokemon]);

  const okCallback = (response) => {
    setPokemon(response.data);
  };

  const koCallback = (error) => {
    console.log(error);
  };

  const okEvolutionChainCallback = (response) => {
    console.log(response);
    const firstStep = response.data.chain.evolves_to.map((evolution) => evolution.species);
    const secondStep = response.data.chain.evolves_to[0].evolves_to.map((evolution) => evolution.species);
    console.log(firstStep);
    console.log(secondStep);
    setPokemonEvolutions([{ ...response.data.chain.species, sprite: pokemon?.sprites.front_default }]);
    getPokemonsInfo(okCallbackInfo, koCallbackInfo, `${process.env.REACT_APP_BASE_URL}pokemon/${firstStep[0].name}`, [
      response.data.chain.species,
      ...firstStep,
      ...secondStep,
    ]);
    getPokemonsInfo(okCallbackInfo, koCallbackInfo, `${process.env.REACT_APP_BASE_URL}pokemon/${secondStep[0].name}`, [
      response.data.chain.species,
      ...firstStep,
      ...secondStep,
    ]);
  };

  const koEvolutionChainCallback = () => {};

  const okCallbackInfo = (response, onlyNamePokemonList) => {
    const object = { ...onlyNamePokemonList[response.data.id - 1], sprite: response.data.sprites.front_default };
    setPokemonEvolutions((prevPokemonList) => [...prevPokemonList, object]);
  };

  const koCallbackInfo = (error) => {
    console.log(error);
  };

  return (
    <>
      <div>PokemonDetail</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img src={pokemon?.sprites.front_default} alt="front sprite"></img>
        <img src={pokemon?.sprites.back_default} alt="back sprite"></img>
      </div>
      <p>Numero di pokedex: {pokemon?.weight}</p>
      <p>Altezza del pokemon: {pokemon?.height}</p>
      <p>Peso del pokemon: {pokemon?.game_indices[0].game_index}</p>
      <p>
        Tipi:{" "}
        {pokemon?.types.map((type) => (
          <>{type.type.name} </>
        ))}
      </p>
      <>
        {" "}
        Statistiche:{" "}
        {pokemon?.stats.map((stat) => (
          <>
            <p>
              {stat.stat.name} - {stat.base_stat}
            </p>
          </>
        ))}
      </>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        {pokemonEvolutions?.map((evolutions) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {evolutions.name} <img src={evolutions.sprite} onClick={() => navigate(`/${evolutions.name}`)}></img>
          </div>
        ))}
      </div>
    </>
  );
};

export default PokemonDetail;
