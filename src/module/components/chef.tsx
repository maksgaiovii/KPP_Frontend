import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMoveAlongPoints } from '../../hook/useMoveAlongPoints';
import { updateChef } from '../../redux/reduser/game/chefs';
import { IChef } from '../../types/chef';
import { getDistance } from '../../util';
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useLoader } from '@react-three/fiber';

export const Chef = ({ position, goTo, ...rest }: Partial<IChef>) => {
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const dispatch = useDispatch();
  

  const chefModelGLTF = useLoader(GLTFLoader, '/assets/chef_cartoon_ver.gltf', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);
    dracoLoader.setDecoderConfig({type: 'js'});
  });
  
  const { objectRef } = useMoveAlongPoints(positions, 0.1, (index, points) => {
    setTimeout(() => {
      // без setTimeout утворюється зациклення, відкрий консоль
      dispatch(updateChef({ ...rest, position: points[index] } as any));
    }, 1);
  });

  useEffect(() => {
    if (position) {
      if (!positions.some((pos) => getDistance(pos, position as any) < 0.5)) {
        setPositions((pre) => [...pre, position as any]);
      }
    }
  }, [position, positions]);

  useEffect(() => {
    if (goTo) {
      setPositions((prev) => [...prev, ...goTo]);
    }
  }, [goTo]);

  return (
    <primitive
        ref={objectRef}
        object={chefModelGLTF.scene}
        scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
      />
  );
};
