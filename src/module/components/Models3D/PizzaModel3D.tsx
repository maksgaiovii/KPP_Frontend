import React from 'react';
import { IPizza } from '../../../types/pizza';

interface Pizza3DProps {
  pizza: IPizza;
}

const Pizza3DModel: React.FC<Pizza3DProps> = ({ pizza }) => {
  // Define color mapping for each state
  const stateColors: Record<IPizza['state'], { crustColor: string; sauceColor: string; toppingColor: string }> = {
    INITIAL: {
      crustColor: 'wheat',
      sauceColor: 'transparent',
      toppingColor: 'transparent',
    },
    DOUGH_PREPARED: {
      crustColor: 'wheat',
      sauceColor: 'transparent',
      toppingColor: 'transparent',
    },
    DOUGH_ROLLED: {
      crustColor: '#f5deb3', // Lighter wheat
      sauceColor: 'transparent',
      toppingColor: 'transparent',
    },
    SAUCE_ADDED: {
      crustColor: '#f5deb3',
      sauceColor: 'tomato',
      toppingColor: 'transparent',
    },
    TOPPING_ADDED: {
      crustColor: '#f5deb3',
      sauceColor: 'tomato',
      toppingColor: 'salmon',
    },
    BAKED: {
      crustColor: '#d2b48c', // Darker crust
      sauceColor: '#c0392b', // Richer sauce
      toppingColor: '#ff6347', // Bright toppings
    },
    FINISHING_TOUCHES: {
      crustColor: '#d2691e', // Golden crust
      sauceColor: '#e74c3c', // Bright sauce
      toppingColor: '#cd5c5c', // Finalized toppings
    },
    COMPLETED: {
      crustColor: '#d2b48c', // Darker crust
      sauceColor: '#c0392b', // Richer sauce
      toppingColor: '#ff6347', // Bright toppings
    },
  } as const;

  const colors = stateColors[pizza.state] || stateColors['DOUGH_PREPARED'];

  return (
    <group scale={[0.3, 0.3, 0.3]}>
      {/* Pizza Crust */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 32]} />
        <meshBasicMaterial color={colors.crustColor} />
      </mesh>
      {/* Pizza Sauce */}
      {colors.sauceColor !== 'transparent' && (
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.1, 32]} />
          <meshBasicMaterial color={colors.sauceColor} />
        </mesh>
      )}
      {/* Toppings */}
      {colors.toppingColor !== 'transparent' &&
        Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 3) * 1.5, 0.2, Math.sin((i * Math.PI) / 3) * 1.5]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshBasicMaterial color={colors.toppingColor} />
          </mesh>
        ))}
    </group>
  );
};

export default Pizza3DModel;
