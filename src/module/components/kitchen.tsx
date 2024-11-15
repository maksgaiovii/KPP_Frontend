/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */

import { Euler, Vector3 } from '@react-three/fiber';
import { Chef } from './chef';
import { Collidable } from './colidable';

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
  table: {
    position: [1, 0.5, 1], // Центр кухні
    size: [3, 1, 3],
    color: 'brown',
    rotation: [0, 0, 0],
  },
  ovens: [
    { position: [-4, 0.5, -2] },
    { position: [-4, 0.5, 4] },
    { position: [-4, 0.5, 0] },
    { position: [-4, 0.5, 2] },
    { position: [-2, 0.5, -4] },
    { position: [4, 0.5, -4] },
    { position: [0, 0.5, -4] },
    { position: [2, 0.5, -4] },
  ].map((oven) => ({ ...oven, size: [1, 1, 1], color: 'gray', rotation: [0, 0, 0] })),
} as any;

export const Kitchen = () => {
  return (
    <>
      {/* Платформа кухні */}

      <Collidable fn={() => kitchenConfig.floor}>
        {({ refference }) => (
          <mesh
            ref={refference}
            position={kitchenConfig.floor.position as Vector3}
            rotation={kitchenConfig.floor.rotation as Euler}
          >
            <boxGeometry args={kitchenConfig.floor.size as any} />
            <meshMatcapMaterial color={kitchenConfig.floor.color} />
          </mesh>
        )}
      </Collidable>

      {/* Стіні кухні */}
      {kitchenConfig.walls.map((wall, index) => (
        <Collidable key={index} fn={() => wall}>
          {({ refference }) => (
            <mesh ref={refference} position={wall.position as Vector3} rotation={wall.rotation as Euler}>
              <boxGeometry args={wall.size as any} />
              <meshMatcapMaterial color={wall.color} />
            </mesh>
          )}
        </Collidable>
      ))}

      {/* Столик посередині кухні */}
      <Collidable fn={() => kitchenConfig.table}>
        {({ refference }) => (
          <mesh
            ref={refference}
            position={kitchenConfig.table.position as Vector3}
            rotation={kitchenConfig.table.rotation as Euler}
          >
            <boxGeometry args={kitchenConfig.table.size as any} />
            <meshMatcapMaterial color={kitchenConfig.table.color} />
          </mesh>
        )}
      </Collidable>

      {/* Пічки вздовж стін */}
      {kitchenConfig.ovens.map((oven, index) => (
        <Collidable key={index} fn={() => oven}>
          {({ refference }) => (
            <mesh ref={refference} position={oven.position as Vector3} rotation={oven.rotation as Euler}>
              <boxGeometry args={oven.size as any} />
              <meshMatcapMaterial color={oven.color} />
            </mesh>
          )}
        </Collidable>
      ))}

      <Chef />
    </>
  );
};
