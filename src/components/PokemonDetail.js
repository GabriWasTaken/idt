import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPokemonsInfo, getEvolutionChain, getPokemonSpecies } from "../services/pokemonServices";
import { useTranslation } from "react-i18next";
import Topbar from "./Topbar";

const PokemonDetail = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState();
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setPokemonEvolutions([]);
    getPokemonsInfo(okCallback, koCallback, `${process.env.REACT_APP_BASE_URL}pokemon${location.pathname}`);
  }, [location]);

  useEffect(() => {
    if (pokemon) {
      getPokemonSpecies(
        okSpeciesCallback,
        koSpeciesCallback,
        `${process.env.REACT_APP_BASE_URL}pokemon-species${location.pathname}`
      );
    }
  }, [pokemon]);

  const okSpeciesCallback = (response) => {
    console.log(response.data.evolution_chain.url);
    getEvolutionChain(okEvolutionChainCallback, koEvolutionChainCallback, response.data.evolution_chain.url);
  };

  const koSpeciesCallback = (error) => {
    console.log(error);
  };

  const okCallback = (response) => {
    setPokemon(response.data);
  };

  const koCallback = (error) => {
    console.log(error);
  };

  const okEvolutionChainCallback = (response) => {
    const firstStep = response.data.chain.evolves_to.map((evolution) => evolution.species);
    const secondStep = response.data.chain.evolves_to[0].evolves_to.map((evolution) => evolution.species);

    getPokemonsInfo(
      okCallbackInfo,
      koCallbackInfo,
      `${process.env.REACT_APP_BASE_URL}pokemon/${response.data.chain.species.name}`,
      [response.data.chain.species, ...firstStep, ...secondStep]
    );

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

  const koEvolutionChainCallback = (error) => {
    console.log(error);
  };

  const okCallbackInfo = (response, onlyNamePokemonList) => {
    let nameAndSpriteObject;
    onlyNamePokemonList.forEach((pokemon, id) => {
      if (pokemon.name === response.data.name) {
        nameAndSpriteObject = {
          ...onlyNamePokemonList[id],
          sprite: response.data.sprites.front_default,
        };
      }
    });
    setPokemonEvolutions((prevPokemonList) => [...prevPokemonList, nameAndSpriteObject]);
  };

  const koCallbackInfo = (error) => {
    console.log(error);
  };

  return (
    <>
      <Topbar />
      <div>{t("detail")}</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img src={pokemon?.sprites.front_default} alt="front sprite"></img>
        <img src={pokemon?.sprites.back_default} alt="back sprite"></img>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
        <div>
          {t("pokedex_number")} {pokemon?.weight}
        </div>
        <div>
          {t("pokemon_height")} {pokemon?.height}
        </div>
        <div>
          {t("pokemon_weight")} {pokemon?.game_indices[0].game_index}
        </div>
        <div>
          {t("types")}
          {pokemon?.types.map((type) => (
            <>{type.type.name} </>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {t("stats")}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            {t("total")} {pokemon?.stats.reduce((accumulator, currentValue) => accumulator + currentValue.base_stat, 0)}
          </div>
          {pokemon?.stats.map((stat) => (
            <div>
              {stat.stat.name} - {stat.base_stat}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        {pokemonEvolutions?.map((evolutions) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {evolutions.name}{" "}
            {
              <img
                alt="evolution-sprite"
                src={evolutions.sprite}
                onClick={() => {
                  navigate(`/${evolutions.name}`);
                }}
              ></img>
            }
          </div>
        ))}
      </div>
    </>
  );
};

export default PokemonDetail;
