import React, { useRef } from 'react';
import { Mesh } from 'three';

interface CustomerModel3DProps {
  bodyColor: string;
  headColor: string;
  limbColor: string;
  hatColor: string; // Optional hat color
  shirtColor: string;
  pantsColor: string;
  shoesColor: string;
  accessoryColor?: string; // For a tie or scarf
}

const CustomerModel3D: React.FC<CustomerModel3DProps> = ({
  bodyColor,
  headColor,
  limbColor,
  hatColor,
  shirtColor,
  pantsColor,
  shoesColor,
  accessoryColor,
}) => {
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const leftLegRef = useRef<Mesh>(null);
  const rightLegRef = useRef<Mesh>(null);
  const hatRef = useRef<Mesh>(null);
  const shirtRef = useRef<Mesh>(null);
  const leftShoeRef = useRef<Mesh>(null);
  const rightShoeRef = useRef<Mesh>(null);
  const accessoryRef = useRef<Mesh>(null);

  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshBasicMaterial color={bodyColor} />
      </mesh>
      {/* Shirt */}
      <mesh ref={shirtRef} position={[0, 1.3, 0.2]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshBasicMaterial color={shirtColor} />
      </mesh>
      {/* Head */}
      <mesh ref={headRef} position={[0, 2.9, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color={headColor} />
      </mesh>
      {/* Hat */}
      <mesh ref={hatRef} position={[0, 3.4, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshBasicMaterial color={hatColor} />
      </mesh>
      {/* Tie or Accessory */}
      {accessoryColor && (
        <mesh ref={accessoryRef} position={[0, 1.9, 0.3]}>
          <boxGeometry args={[0.2, 0.5, 0.05]} /> {/* Narrow rectangle for a tie */}
          <meshBasicMaterial color={accessoryColor} />
        </mesh>
      )}
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.7, 1.7, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshBasicMaterial color={limbColor} />
      </mesh>
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.7, 1.7, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshBasicMaterial color={limbColor} />
      </mesh>
      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.2, 0.3, -0.01]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshBasicMaterial color={pantsColor} />
      </mesh>
      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.2, 0.3, -0.01]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshBasicMaterial color={pantsColor} />
      </mesh>
      {/* Left Shoe */}
      <mesh ref={leftShoeRef} position={[-0.3, -0.4, -0.01]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} />
        <meshBasicMaterial color={shoesColor} />
      </mesh>
      {/* Right Shoe */}
      <mesh ref={rightShoeRef} position={[0.3, -0.4, -0.01]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} />
        <meshBasicMaterial color={shoesColor} />
      </mesh>
    </group>
  );
};

export default CustomerModel3D;
