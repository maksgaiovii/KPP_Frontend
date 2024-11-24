import React, { useRef } from 'react';
import { Mesh } from 'three';

interface ChefModel3DProps {
  bodyColor: string;
  headColor: string;
  limbColor: string;
  capColor: string;
  shirtColor: string; // New color for the shirt
  pantsColor: string; // New color for the pants
  shoesColor: string; // New color for the shoes
}

const ChefModel3D: React.FC<ChefModel3DProps> = ({
  bodyColor,
  headColor,
  limbColor,
  capColor,
  shirtColor,
  pantsColor,
  shoesColor,
}) => {
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const leftLegRef = useRef<Mesh>(null);
  const rightLegRef = useRef<Mesh>(null);
  const capRef = useRef<Mesh>(null); // Ref for the chef's cap
  const shirtRef = useRef<Mesh>(null); // Ref for the shirt
  const leftShoeRef = useRef<Mesh>(null); // Ref for left shoe
  const rightShoeRef = useRef<Mesh>(null); // Ref for right shoe

  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 2, 0.5]} /> {/* Box geometry for the body */}
        <meshBasicMaterial color={bodyColor} />
      </mesh>
      {/* Shirt */}
      <mesh ref={shirtRef} position={[0, 1.3, 0.2]}>
        <boxGeometry args={[1, 1.5, 0.5]} /> {/* Box geometry for the shirt */}
        <meshBasicMaterial color={shirtColor} />
      </mesh>
      {/* Head */}
      <mesh ref={headRef} position={[0, 2.9, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} /> {/* Box geometry for the head */}
        <meshBasicMaterial color={headColor} />
      </mesh>
      {/* Chef's Cap */}
      <mesh ref={capRef} position={[0, 3.4, 0]}>
        {' '}
        {/* Slightly above the head */}
        <boxGeometry args={[1, 0.4, 1]} /> {/* A wide, flat box for the base of the cap */}
        <meshBasicMaterial color={capColor} />
      </mesh>
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.7, 1.7, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} /> {/* Box geometry for the left arm */}
        <meshBasicMaterial color={limbColor} />
      </mesh>
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.7, 1.7, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} /> {/* Box geometry for the right arm */}
        <meshBasicMaterial color={limbColor} />
      </mesh>
      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.2, 0.3, -0.01]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} /> {/* Box geometry for the left leg */}
        <meshBasicMaterial color={pantsColor} />
      </mesh>
      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.2, 0.3, -0.01]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} /> {/* Box geometry for the right leg */}
        <meshBasicMaterial color={pantsColor} />
      </mesh>
      {/* Left Shoe */}
      <mesh ref={leftShoeRef} position={[-0.3, -0.4, -0.01]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} /> {/* Box geometry for the left shoe */}
        <meshBasicMaterial color={shoesColor} />
      </mesh>
      {/* Right Shoe */}
      <mesh ref={rightShoeRef} position={[0.3, -0.4, -0.01]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} /> {/* Box geometry for the right shoe */}
        <meshBasicMaterial color={shoesColor} />
      </mesh>
    </group>
  );
};

export default ChefModel3D;
