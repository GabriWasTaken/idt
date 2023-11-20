import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardMedia } from "@mui/material";
import { getPokemons, getPokemonsInfo } from "../services/pokemonServices";
import { setPokemonOffset } from "../reducers/pokemonReducer";
import Pagination from "./Pagination";
import Topbar from "./Topbar";

const PokemonsList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const offset = useSelector((state) => state.pokemon.offset);
  const LIMIT = 10;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    dispatch(setPokemonOffset(offset + LIMIT));
  };

  const goPrevPage = () => {
    if (offset >= LIMIT) {
      setPokemonList([]);
      dispatch(setPokemonOffset(offset - LIMIT));
    }
  };

  return (
    <>
      <Topbar />
      <div style={{ marginBottom: 30, marginTop: 10 }}>{t("title")}</div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {pokemonList &&
          pokemonList.map((pokemon) => {
            return (
              <Card key={pokemon.name}>
                <CardHeader
                  title={pokemon.name}
                  style={{ pointerEvents: "visible", cursor: "pointer" }}
                  onClick={() => navigate(`/${pokemon.name}`)}
                />
                <CardMedia
                  style={{ pointerEvents: "visible", cursor: "pointer" }}
                  component="img"
                  height="194"
                  image={pokemon.sprite}
                  alt="Pokemon sprite"
                  onClick={() => navigate(`/${pokemon.name}`)}
                />
              </Card>
            );
          })}
      </div>
      <Pagination goNextPage={goNextPage} goPrevPage={goPrevPage} offset={offset} LIMIT={LIMIT} />
    </>
  );
};

export default PokemonsList;
