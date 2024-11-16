import { Euler, Vector3 } from '@react-three/fiber';
import { Chef } from './chef';
import { Oven } from './oven';  // Імпортуємо компонент Oven

const kitchenConfig = {
  floor: {
    position: [0, -0.5, 0],
    rotation: [0, -Math.PI / 2, 0],
    size: [10, 1, 10],
    color: '#8F6F47',
  },
  walls: [
    { position: [-5.5, 2, -0.5], rotation: [0, Math.PI / 2, 0], size: [11, 7, 1], color: '#5D76A6' },
    { position: [0, 2, -5.5], rotation: [0, Math.PI, 0], size: [10, 7, 1], color: '#5D76A6' },
  ],
  table: {
    position: [2, 0.4, 2], // Центр кухні
    size: [2.5, 0.7, 2.5], // Розміри для основи
    baseColor: '#673033', // Колір для основи стола
    topColor: 'white',  // Колір для верхньої частини стола
    rotation: [0, 0, 0],
    topSize: [3, 0.2, 3], // Розміри для верхньої частини
    topPosition: [2, 0.8, 2], // Позиція верхньої частини (піднята над основою)
  },
  ovens: [
    { position: [-2, 0, -4] },
    { position: [4, 0, -4] },
    { position: [0, 0, -4] },
    { position: [2, 0, -4] },
  ],
  barCounter: {
    top: {
      position: [-4.3, 1.25, 0.4], // Позиція верхньої частини барної стійки (піднята)
      size: [1.4, 0.2, 9.2], // Розміри верхньої частини
      color: '#C39B6E', // Колір верхньої частини
    },
  },
} as any;

export const Kitchen = () => {
  return (
    <>
      {/* Платформа кухні */}
      <mesh position={kitchenConfig.floor.position as Vector3} rotation={kitchenConfig.floor.rotation as Euler}>
        <boxGeometry args={kitchenConfig.floor.size as any} />
        <meshMatcapMaterial color={kitchenConfig.floor.color} />
      </mesh>

      {/* Стіні кухні */}
      {kitchenConfig.walls.map((wall: any, index: number) => (
        <mesh key={index} position={wall.position as Vector3} rotation={wall.rotation as Euler}>
          <boxGeometry args={wall.size as any} />
          <meshMatcapMaterial color={wall.color} />
        </mesh>
      ))}

      {/* Основа стола */}
      <mesh position={kitchenConfig.table.position as Vector3} rotation={kitchenConfig.table.rotation as Euler}>
        <boxGeometry args={kitchenConfig.table.size as any} />
        <meshMatcapMaterial color={kitchenConfig.table.baseColor} /> {/* Використовуємо колір для основи */}
      </mesh>

      {/* Верхня частина стола */}
      <mesh position={kitchenConfig.table.topPosition as Vector3} rotation={kitchenConfig.table.rotation as Euler}>
        <boxGeometry args={kitchenConfig.table.topSize as any} />
        <meshMatcapMaterial color={kitchenConfig.table.topColor} /> {/* Використовуємо колір для верхньої частини */}
      </mesh>

      {/* Печі вздовж стін */}
      {kitchenConfig.ovens.map((oven: any, index: number) => (
        <Oven key={index} position={oven.position as Vector3} rotation={oven.rotation as [number, number, number]} />
      ))}

      {/* Верхня частина барної стійки */}
      <mesh position={kitchenConfig.barCounter.top.position as Vector3}>
        <boxGeometry args={kitchenConfig.barCounter.top.size as any} />
        <meshMatcapMaterial color={kitchenConfig.barCounter.top.color} />
      </mesh>
    </>
  );
};
