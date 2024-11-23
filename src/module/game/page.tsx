import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useStart } from '../../hook/useStart';
import { Kitchen } from '../components/kitchen';
import { Lobby } from '../components/lobby';
import '../../../public/css/gameControls.css'; // Імпортуємо стилі

export function Game() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [terminate, setTerminate] = useState(false);

  useStart({ isPlaying, terminate });

  useEffect(() => {
    const onSpacePress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        console.log('Space pressed');
        setIsPlaying((prev) => !prev);
      }
    };

    const onEscapePress = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setTerminate(true);
      }
    };

    window.addEventListener('keydown', onSpacePress);
    window.addEventListener('keydown', onEscapePress);

    return () => {
      window.removeEventListener('keydown', onSpacePress);
      window.removeEventListener('keydown', onEscapePress);
    };
  }, []);

  useEffect(() => {
    try {
      document.body.style.background = 'url(img/game_bg.png)';
      document.body.style.backgroundSize = 'cover';
      document.body.style.height = '100vh';
    } catch (error) {
      console.error('Failed to change background', error);
    }

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleButtonClick = (action: string) => {
    console.log(`${action} button clicked`);
    // Add logic for each button action
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Canvas
        camera={{ position: [15, 15, 15], fov: 75 }}
        style={{ backgroundColor: 'black' }}
      >
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        <ambientLight intensity={0.2} />
        <pointLight position={[15, 10, 15]} intensity={500} color="#FE0071" />
        <pointLight position={[-10, 10, -10]} intensity={500} color="#009999" />
        <pointLight position={[-15, 10, 15]} intensity={500} color="#00FFF6" />
        <Kitchen />
        <Lobby />
        <Floor />
      </Canvas>

      {/* Кнопки поверх Canvas */}
      <div className="game-control-container">
        <div className="game-control play">
          Play
        </div>
        <div className="game-control terminate">
          Terminate
        </div>
        <div className="game-control pause">
          Pause
        </div>
        <div className="game-control continue">
          Continue
        </div>
      </div>
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
