/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Euler, Vector3 } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const kitchenConfig = {
  floor: {
    position: [0, -0.5, 0],
    rotation: [0, -Math.PI / 2, 0],
    size: [10, 1, 10],
    color: 'gray',
  },
  walls: [
    { position: [-5, 1.5, 0], rotation: [0, Math.PI / 2, 0], size: [10, 3, 1], color: 'lightblue' },
    { position: [0, 1.5, -5], rotation: [0, Math.PI, 0], size: [10, 3, 1], color: 'lightblue' },
  ],
};

export const Kitchen = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <mesh
        ref={floorRef}
        position={kitchenConfig.floor.position as Vector3}
        rotation={kitchenConfig.floor.rotation as Euler}
      >
        <boxGeometry args={kitchenConfig.floor.size as any} />
        <meshMatcapMaterial color={kitchenConfig.floor.color} />
      </mesh>

      {kitchenConfig.walls.map((wall, index) => (
        <mesh key={index} position={wall.position as Vector3} rotation={wall.rotation as Euler}>
          <boxGeometry args={wall.size as any} />
          <meshMatcapMaterial color={wall.color} />
        </mesh>
      ))}
    </>
  );
};
