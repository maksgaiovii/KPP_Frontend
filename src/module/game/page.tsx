/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Kitchen } from '../components/kitchen';
import { Physics } from '@react-three/cannon';

/* eslint-disable no-empty-pattern */
export interface IPageProps {}

export function Game({}: IPageProps) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Canvas camera={{ position: [15, 15, 15], fov: 75 }}>
        <Physics>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Kitchen />
        </Physics>
      </Canvas>
    </div>
  );
}
