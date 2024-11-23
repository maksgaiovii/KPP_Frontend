import React from 'react';
import { Vector3 } from '@react-three/fiber';

const ovenConfig = {
  base: {
    position: [0, 0.25, 0],
    size: [1, 1.6, 1],
    color: '#515151',
  },
  walls: [
    { position: [0, 1.25, -0.45], size: [1, 0.5, 0.1], color: '#515151' },
    { position: [-0.45, 1.25, 0], size: [0.1, 0.5, 1], color: '#515151' },
    { position: [0.45, 1.25, 0], size: [0.1, 0.5, 1], color: '#515151' },
  ],
  top: {
    position: [0, 1.6, 0],
    size: [1, 0.2, 1],
    color: '#707070',
  },
  light: {
    position: [0, 1.2, 0],
    intensity: 10,
    color: 'orange',
  },
  chimney: {
    position: [0, 2.1, -0.4], // Позиція димовідведення
    rotation: [-0.4, 0, 0], // Обертання димовідведення
    size: [0.2, 1.0, 0.2], // Розміри димовідведення
    color: '#404040', // Колір димовідведення
  },
};

interface OvenProps {
  position: Vector3;
  rotation?: [number, number, number]; // Додаємо параметр rotation для повернення
}

export const Oven: React.FC<OvenProps> = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={ovenConfig.base.position as Vector3}>
        <boxGeometry args={ovenConfig.base.size as [number, number, number]} />
        <meshStandardMaterial color={ovenConfig.base.color} />
      </mesh>

      {/* Walls */}
      {ovenConfig.walls.map((wall, index) => (
        <mesh key={index} position={wall.position as Vector3}>
          <boxGeometry args={wall.size as [number, number, number]} />
          <meshStandardMaterial color={wall.color} />
        </mesh>
      ))}

      {/* Top Plate */}
      <mesh position={ovenConfig.top.position as Vector3}>
        <boxGeometry args={ovenConfig.top.size as [number, number, number]} />
        <meshStandardMaterial color={ovenConfig.top.color} />
      </mesh>

      {/* Light Inside */}
      <pointLight
        position={ovenConfig.light.position as Vector3}
        intensity={ovenConfig.light.intensity}
        color={ovenConfig.light.color}
      />

      {/* Chimney (Smoke Vent) */}
      <mesh
        position={ovenConfig.chimney.position as Vector3}
        rotation={ovenConfig.chimney.rotation as [number, number, number]} // Повертаємо димовідвід
      >
        <boxGeometry args={ovenConfig.chimney.size as [number, number, number]} />
        <meshStandardMaterial color={ovenConfig.chimney.color} />
      </mesh>
    </group>
  );
};
