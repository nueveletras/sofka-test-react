import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "../animations/BoxGeometry";
import { OrbitControls } from "@react-three/drei";
import { useParams, Link } from "react-router-dom";
import { Fieldset } from "primereact/fieldset";
import { PokemonService } from "../../core/service/PokemonService";
import { Button } from "primereact/button";

const Pokemon = () => {
  const pokemonService = new PokemonService();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    pokemonService.getPokemonInfo(id).then((data) => {
      return setPokemon(data);
    });
  }, []);
  console.log(pokemon);
  return (
    <div className="flex justify-content-center flex-wrap">
      <Canvas className="flex justify-content-center flex-wrap">
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[0, 0, 0]} idPokemon={id} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="col-12 flex justify-content-center flex-wrap">
        <p>Usa el mouse para controlar el objeto</p>
      </div>
      <div className="pt-3 col-12 md:col-2">
        <img
              className="pt-3 col w-12"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                id
              }.png`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={pokemon?.name}
            />
      </div>
      
      <div className="pt-3 col-12 md:col-4">
        <div className="pokemon-grid-item card">
          <div className="pokemon-grid-item-content col-12">
            <Fieldset className="pokemon-grid-item card " legend={pokemon?.name?.toUpperCase()}>
              <div className="justify-content-center ">
                <div>
                  <h2>Abilities</h2>
                  {pokemon?.abilities?.map((element, i) => {
                    console.log(element);
                    return <p key={i}>{element.ability.name}</p>;
                  })}
                </div>
                <div>
                  <h2>Type</h2>
                  {pokemon?.types?.map((element, i) => {
                    console.log(element);
                    return <p key={i}>{element.type.name}</p>;
                  })}
                </div>
              </div>
            </Fieldset>
            <div className="pt-2 col-12 flex justify-content-center flex-wrap">
              <Link to={`/`}>
                <Button icon="pi pi-list" label="Regresar a la lista"></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
