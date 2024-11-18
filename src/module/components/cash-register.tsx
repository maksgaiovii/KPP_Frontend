/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';

interface ButtonWithTextProps {
  position: [number, number, number];
  text: string;
  color: string;
  onClick: () => void;
}

const ButtonWithText: React.FC<ButtonWithTextProps> = ({ position, text, color, onClick }: ButtonWithTextProps) => {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 20, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <boxGeometry args={[0.3, 0.08, 0.05]} />
      <meshStandardMaterial color={color} />
      <Text position={[0, 0, 0.028]} fontSize={0.045} color="white" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </mesh>
  );
};

interface CashRegisterProps {
  position: Vector3;
}

export const CashRegister: React.FC<CashRegisterProps> = ({ position }: CashRegisterProps) => {
  /*
  
  
    Тіпа обробники кліків користувача,
    які нічого не роблять, а просто існують :)
  
  
  */
  const handleOrder = () => alert('Order placed');
  const handleCancel = () => alert('Order cancelled');

  const handlePizzaSelection = (_pizza: string) => {
    // setSelectedPizza(pizza);
  };

  return (
    <group position={position}>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.6, 0.2, 1, 5]} />
        <meshStandardMaterial color="#123351" />
      </mesh>

      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.1]} />
        <meshStandardMaterial color="#112932" />
      </mesh>

      <mesh position={[0, 0.2, 0.1]} rotation={[-Math.PI / -2.2, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 1]} />
        <meshStandardMaterial color="#0b132b" />
      </mesh>

      <mesh position={[0, 0.3, 0.09]} rotation={[-Math.PI / -2.2, 0, 0]}>
        <boxGeometry args={[0.7, 0.05, 0.7]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <ButtonWithText
        position={[0, 0.1, 0.12]}
        text="Margherita"
        color="#ffdd57"
        onClick={() => handlePizzaSelection('Margherita')}
      />
      <ButtonWithText
        position={[0, 0.2, 0.11]}
        text="Pepperoni"
        color="#ff5733"
        onClick={() => handlePizzaSelection('Pepperoni')}
      />
      <ButtonWithText
        position={[0, 0.3, 0.095]}
        text="Hawaiian"
        color="#ff3e00"
        onClick={() => handlePizzaSelection('Hawaiian')}
      />
      <ButtonWithText
        position={[0, 0.4, 0.08]}
        text="Veggie"
        color="#9bcd56"
        onClick={() => handlePizzaSelection('Veggie')}
      />
      <ButtonWithText
        position={[0, 0.5, 0.065]}
        text="Cheese"
        color="#f7c8b8"
        onClick={() => handlePizzaSelection('Cheese')}
      />

      {/* Buttons */}
      <ButtonWithText position={[-0.2, -0.17, 0.17]} text="Order" color="#06d6a0" onClick={handleOrder} />
      <ButtonWithText position={[0.2, -0.17, 0.17]} text="Cancel" color="#ff0054" onClick={handleCancel} />
      <pointLight position={[0, 1, 0]} intensity={6} color="white" />
    </group>
  );
};
