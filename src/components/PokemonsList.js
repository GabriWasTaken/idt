import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getPokemons, getPokemonsInfo } from "../services/pokemonServices";
import { Card, CardHeader, CardMedia } from "@mui/material";
import Pagination from "./Pagination";

const PokemonsList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const LIMIT = 10;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getPokemons(okCallback, koCallback, { offset, LIMIT });
  }, [offset]);

  const okCallback = (response) => {
    response.data.results.forEach((pokemon) => {
      getPokemonsInfo(okCallbackInfo, koCallbackInfo, pokemon.url, response.data.results);
    });
  };

  const koCallback = (error) => {
    console.log(error);
  };

  const okCallbackInfo = (response, onlyNamePokemonList) => {
    const object = {
      ...onlyNamePokemonList[response.data.id - offset - 1],
      sprite: response.data.sprites.front_default,
    };
    setPokemonList((prevPokemonList) => [...prevPokemonList, object]);
  };

  const koCallbackInfo = (error) => {
    console.log(error);
  };

  const goNextPage = () => {
    setPokemonList([]);
    setOffset((prev) => prev + LIMIT);
  };

  const goPrevPage = () => {
    if (offset >= LIMIT) {
      setPokemonList([]);
      setOffset((prev) => prev - LIMIT);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 30, marginTop: 10 }}>{t("title")}</div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {pokemonList &&
          pokemonList.map((pokemon) => {
            return (
              <Card key={pokemon.name}>
                <CardHeader title={pokemon.name} onClick={() => navigate(`/${pokemon.name}`)} />
                <CardMedia component="img" height="194" image={pokemon.sprite} alt="Pokemon sprite" />
              </Card>
            );
          })}
      </div>
      <Pagination goNextPage={goNextPage} goPrevPage={goPrevPage} offset={offset} LIMIT={LIMIT} />
    </>
  );
};

export default PokemonsList;
