import React from 'react';

interface ChefModel3DProps {
  bodyColor: string;
  headColor: string;
  limbColor: string;
  capColor: string;
  shirtColor: string;
  pantsColor: string;
  shoesColor: string;
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
  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshBasicMaterial color={bodyColor} />
      </mesh>
      {/* Shirt */}
      <mesh position={[0, -0.2, 0.2]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshBasicMaterial color={shirtColor} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color={headColor} />
      </mesh>
      {/* Chef's Cap */}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[1, 0.4, 1]} />
        <meshBasicMaterial color={capColor} />
      </mesh>
      {/* Left Arm */}
      <mesh position={[-0.7, 0.2, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshBasicMaterial color={limbColor} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.7, 0.2, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshBasicMaterial color={limbColor} />
      </mesh>
      {/* Left Leg */}
      <mesh position={[-0.2, -1.2, -0.01]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshBasicMaterial color={pantsColor} />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.2, -1.2, -0.01]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshBasicMaterial color={pantsColor} />
      </mesh>
      {/* Left Shoe */}
      <mesh position={[-0.3, -1.9, -0.01]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} />
        <meshBasicMaterial color={shoesColor} />
      </mesh>
      {/* Right Shoe */}
      <mesh position={[0.3, -1.9, -0.01]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} />
        <meshBasicMaterial color={shoesColor} />
      </mesh>
    </group>
  );
};

export default ChefModel3D;
