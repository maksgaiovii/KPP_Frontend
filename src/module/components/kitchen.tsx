import { useSelector } from 'react-redux';
import { Text } from '@react-three/drei';
import { Euler, Vector3 } from '@react-three/fiber';
import { chefs as chefsConstant } from '../../constant';
import { getChefs } from '../../redux/reduser/game/chefs';
import { Chef } from './chef';
import { Oven } from './oven';

const kitchenConfig = {
  floor: {
    position: [0, -0.5, 0],
    rotation: [0, -Math.PI / 2, 0],
    size: [10, 1, 10],
    color: '#8F6F47',
  },
  walls: [
    { position: [-5.5, 2, 7], rotation: [0, Math.PI / 2, 0], size: [26, 7, 1], color: '#2F4F4F' },
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
  ovens: chefsConstant.ovenPositions.map(([p1, p2, p3]: any) => ({ position: [p1, p2, p3 - 1] })),
  barCounter: {
    top: {
      position: [-4.3, 1.25, 0.4],
      size: [1.4, 0.2, 9.2],
      color: '#C39B6E',
    },
  },
  ceiling: {
    position: [-0.5, 5.75, 7],
    size: [11, 0.5, 26],
    color: '#D1D1D1',
  },
} as any;

export const Kitchen = () => {
  const chefs = useSelector(getChefs);

  return (
    <>
      {chefs.map((chef, index) => (
        <Chef key={'chef' + index} {...chef} />
      ))}

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

      <mesh position={[-4.95, 2, 7]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial />
        <Text fontSize={3} color="#D1D1D1" anchorX="center" anchorY="bottom">
          Kosiv Software
        </Text>
      </mesh>
    </>
  );
};
