import React, { useRef } from 'react';
import { Mesh } from 'three';
import { IPizza } from '../../../types/pizza';

interface Pizza3DProps {
  pizza: IPizza;
}

const Pizza3DModel: React.FC<Pizza3DProps> = ({ pizza }) => {
  const crustRef = useRef<Mesh>(null);
  const sauceRef = useRef<Mesh>(null);
  const toppingRefs = useRef<(Mesh | null)[]>([]); // Single useRef for all toppings

  // Define color mapping for each state
  const stateColors: Record<string, { crustColor: string; sauceColor: string; toppingColor: string }> = {
    'dough preparation': {
      crustColor: 'wheat',
      sauceColor: 'transparent',
      toppingColor: 'transparent',
    },
    'dough rolling': {
      crustColor: '#f5deb3', // Lighter wheat
      sauceColor: 'transparent',
      toppingColor: 'transparent',
    },
    'sauce addition': {
      crustColor: '#f5deb3',
      sauceColor: 'tomato',
      toppingColor: 'transparent',
    },
    'topping addition': {
      crustColor: '#f5deb3',
      sauceColor: 'tomato',
      toppingColor: 'salmon',
    },
    baking: {
      crustColor: '#d2b48c', // Darker crust
      sauceColor: '#c0392b', // Richer sauce
      toppingColor: '#ff6347', // Bright toppings
    },
    'finishing touches': {
      crustColor: '#d2691e', // Golden crust
      sauceColor: '#e74c3c', // Bright sauce
      toppingColor: '#cd5c5c', // Finalized toppings
    },
  };

  const colors = stateColors[pizza.state] || stateColors['dough preparation'];

  return (
    <group scale={[0.15, 0.15, 0.15]}>
      {/* Pizza Crust */}
      <mesh ref={crustRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 32]} />
        <meshBasicMaterial color={colors.crustColor} />
      </mesh>
      {/* Pizza Sauce */}
      {colors.sauceColor !== 'transparent' && (
        <mesh ref={sauceRef} position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.1, 32]} />
          <meshBasicMaterial color={colors.sauceColor} />
        </mesh>
      )}
      {/* Toppings */}
      {colors.toppingColor !== 'transparent' &&
        Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              toppingRefs.current[i] = el; // Populate toppingRefs array dynamically
            }}
            position={[Math.cos((i * Math.PI) / 3) * 1.5, 0.2, Math.sin((i * Math.PI) / 3) * 1.5]}
          >
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshBasicMaterial color={colors.toppingColor} />
          </mesh>
        ))}
    </group>
  );
};

export default Pizza3DModel;
