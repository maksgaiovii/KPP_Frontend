import { useCallback, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const useMoveAlongPoints = (
  points: [number, number, number][],
  speed: number,
  onReachPoint?: (_index: number, _points: [number, number, number][]) => void,
  precision: number = 0.5,
) => {
  const objectRef = useRef<THREE.Mesh>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useFrame(() => {
    if (objectRef.current && points[currentIndex]) {
      const object = objectRef.current;

      // If starting at the first point, initialize position
      if (currentIndex === 0) {
        object.position.set(points[currentIndex][0], points[currentIndex][1], points[currentIndex][2]);
        setCurrentIndex(1);
        return;
      }

      const currentPosition = new THREE.Vector3().copy(object.position);
      const targetPosition = new THREE.Vector3(...points[currentIndex]);
      const distance = currentPosition.distanceTo(targetPosition);

      if (distance > precision) {
        const direction = new THREE.Vector3().copy(targetPosition).sub(currentPosition).normalize();
        object.position.add(direction.multiplyScalar(speed));

        // Rotate the object to face the target
        const lookAtPosition = new THREE.Vector3(...points[currentIndex]);
        object.lookAt(lookAtPosition); // Make the object face the target
      } else {
        if (onReachPoint) onReachPoint(currentIndex, points);
        setCurrentIndex((prev) => prev + 1);
      }
    }
  });

  const resetPoints = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return { objectRef, resetPoints };
};
