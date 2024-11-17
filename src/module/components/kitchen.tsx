import { Euler, Vector3 } from '@react-three/fiber';
import { Oven } from './oven';

const kitchenConfig = {
  floor: {
    position: [0, -0.5, 0],
    rotation: [0, -Math.PI / 2, 0],
    size: [10, 1, 10],
    color: '#8F6F47',
  },
  walls: [
    { position: [-5.5, 2, 4.5], rotation: [0, Math.PI / 2, 0], size: [21, 7, 1], color: '#2F4F4F' },
    { position: [0, 2, -5.5], rotation: [0, Math.PI, 0], size: [10, 7, 1], color: '#2F4F4F' },
  ],
  table: {
    position: [2, 0.4, 2],
    size: [2.5, 0.7, 2.5],
    baseColor: '#673033',
    topColor: 'white',
    rotation: [0, 0, 0],
    topSize: [3, 0.2, 3],
    topPosition: [2, 0.8, 2],
  },
  ovens: [
    { position: [-2, 0, -4.5] },
    { position: [4, 0, -4.5] },
    { position: [0, 0, -4.5] },
    { position: [2, 0, -4.5] },
  ],
  barCounter: {
    top: {
      position: [-4.3, 1.25, 0.4],
      size: [1.4, 0.2, 9.2],
      color: '#C39B6E',
    },
  },
  ceiling: {
    position: [-0.5, 5.75, 4.5],
    size: [11, 0.5, 21],
    color: '#D1D1D1',
  },
} as any;

export const Kitchen = () => {
  return (
    <>
      <mesh position={kitchenConfig.floor.position as Vector3} rotation={kitchenConfig.floor.rotation as Euler}>
        <boxGeometry args={kitchenConfig.floor.size as any} />
        <meshMatcapMaterial color={kitchenConfig.floor.color} />
      </mesh>

      {kitchenConfig.walls.map((wall: any, index: number) => (
        <mesh key={index} position={wall.position as Vector3} rotation={wall.rotation as Euler}>
          <boxGeometry args={wall.size as any} />
          <meshMatcapMaterial color={wall.color} />
        </mesh>
      ))}

      <mesh position={kitchenConfig.table.position as Vector3} rotation={kitchenConfig.table.rotation as Euler}>
        <boxGeometry args={kitchenConfig.table.size as any} />
        <meshMatcapMaterial color={kitchenConfig.table.baseColor} />
      </mesh>

      <mesh position={kitchenConfig.table.topPosition as Vector3} rotation={kitchenConfig.table.rotation as Euler}>
        <boxGeometry args={kitchenConfig.table.topSize as any} />
        <meshMatcapMaterial color={kitchenConfig.table.topColor} />
      </mesh>

      {kitchenConfig.ovens.map((oven: any, index: number) => (
        <Oven key={index} position={oven.position as Vector3} rotation={oven.rotation as [number, number, number]} />
      ))}

      <mesh position={kitchenConfig.barCounter.top.position as Vector3}>
        <boxGeometry args={kitchenConfig.barCounter.top.size as any} />
        <meshMatcapMaterial color={kitchenConfig.barCounter.top.color} />
      </mesh>

      <mesh position={kitchenConfig.ceiling.position as Vector3}>
        <boxGeometry args={kitchenConfig.ceiling.size as any} />
        <meshMatcapMaterial color={kitchenConfig.ceiling.color} />
      </mesh>
    </>
  );
};
