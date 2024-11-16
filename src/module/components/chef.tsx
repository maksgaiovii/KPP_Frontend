/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const chefConfig = {
  position: [3, 1, 3],
  args: [0.5],
  color: 'yellow',
  type: 'Static',
  mass: 1,
} as any;

export const Chef = () => {
  const chefRef = useRef<THREE.Mesh>(null);
  const [target, setTarget] = useState<[number, number, number] | null>(null);
  const speed = 0.05;

  useFrame(() => {
    if (chefRef.current && target) {
      const chefPosition = new THREE.Vector3().copy(chefRef.current.position);
      const targetPosition = new THREE.Vector3(...target);
      const direction = targetPosition.sub(chefPosition).normalize();
      const distance = chefPosition.distanceTo(targetPosition);

      if (distance > 0.1) {
        chefRef.current.position.add(direction.multiplyScalar(speed));
      } else {
        setTarget(null);
      }
    }
  });

  const moveToTable = () => {
    setTarget([-2, 1, -2]);
  };

  return (
    <>
      {/* Кухар у вигляді кулі */}
      <mesh ref={chefRef} onClick={moveToTable}>
        <sphereGeometry args={chefConfig.args} />
        <meshMatcapMaterial color={chefConfig.color} />
      </mesh>
    </>
  );
};
