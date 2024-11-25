/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useStart } from '../../hook/useStart';
import { Kitchen } from '../components/kitchen';
import { Lobby } from '../components/lobby';
import '../../../public/css/gameControls.css';
import { sendResumeRequest, sendStartRequest, sendStopRequest, sendTerminateRequest } from '../../socket/index';

export function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [terminate, setTerminate] = useState(false);

  useStart({
    isPlaying,
    terminate,
    isStarted,
    afterStart: () => {
      sendStartRequest();
      setIsStarted(true);
    },
  });

  useEffect(() => {
    try {
      document.body.style.background = 'url(img/game_bg.png)';
      document.body.style.backgroundSize = 'cover';
      document.body.style.height = '100vh';
    } catch (error) {
      console.log(error);
    }

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleButtonClick = async (action: string) => {
    try {
      switch (action) {
        case 'play':
          setIsPlaying(true);

          break;
        case 'pause':
          setIsPlaying(false);
          await sendStopRequest();

          break;
        case 'continue':
          setIsPlaying(true);
          await sendResumeRequest();

          break;
        case 'terminate':
          setTerminate(true);
          await sendTerminateRequest();
          window.location.reload();

          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Canvas camera={{ position: [15, 15, 15], fov: 75 }} style={{ backgroundColor: 'black' }}>
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
        {isStarted && (
          <>
            {' '}
            <div className="game-control pause" onClick={() => handleButtonClick('pause')}>
              Pause
            </div>
            <div className="game-control continue" onClick={() => handleButtonClick('continue')}>
              Continue
            </div>
          </>
        )}
        {!isStarted && (
          <div className="game-control play" onClick={() => handleButtonClick('play')}>
            Play
          </div>
        )}
        <div className="game-control terminate" onClick={() => handleButtonClick('terminate')}>
          Terminate
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
