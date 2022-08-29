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
      <div className="col-12 md:col-4">
        <div className="pokemon-grid-item card">
          <div className="pokemon-grid-item-contentr">
            <Fieldset legend={pokemon?.name?.toUpperCase()}>
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
