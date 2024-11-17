import { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Lobby } from '../components/lobby';
import { Kitchen } from '../components/kitchen';

export function Game() {
  useEffect(() => {
    try {
      document.body.style.background = 'url(img/game_bg.png)';
      document.body.style.backgroundSize = 'cover';
      document.body.style.height = '100vh';
      console.log('Background changed successfully');
    } catch (error) {
      console.error('Failed to change background', error);
    }

    return () => {
      document.body.style.background = '';
      console.log('Background reset successfully');
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Canvas
        camera={{ position: [15, 15, 15], fov: 75 }}
        style={{ backgroundColor: 'black' }} // Задаємо чорний фон
      >
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        <ambientLight intensity={0.2} />
        {/* #9240A1 */}
        <pointLight position={[15, 10, 15]} intensity={500} color="#FE0071" />
        <pointLight position={[-10, 10, -10]} intensity={500} color="#009999" />
        <pointLight position={[-15, 10, 15]} intensity={500} color="#00FFF6" />
        <Kitchen />
        <Lobby />
        <Floor /> {/* Додаємо підлогу */}
        {/* <CashRegister position={[-4, 0, 6]}/>
          <CashRegister position={[-3, 0, 6]}/>
          <CashRegister position={[-2, 0, 6]}/>
          <CashRegister position={[-1, 0, 6]}/> */}
      </Canvas>
    </div>
  );
}

function Floor() {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 400]} />
      <meshStandardMaterial color="gray" metalness={-1} />
    </mesh>
  );
}
