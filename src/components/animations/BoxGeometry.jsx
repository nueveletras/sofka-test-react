import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function Box(props,) {
  const mesh = useRef();

  const [idPokemon] = useState(props.idPokemon);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [boxMap] = useTexture([`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`])
  const { setSize } = useThree();
  useFrame(() => (mesh.current.rotation.y += 0.003));
  useEffect(() => {
    setSize((window.innerWidth), (window.innerHeight - (window.innerHeight*2/3)));
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1.5}
      // onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}      
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial map={boxMap}
       />
    </mesh>
  );
}

export default Box;
