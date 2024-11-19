import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMoveAlongPoints } from '../../hook/useMoveAlongPoints';
import { updateChef } from '../../redux/reduser/game/chefs';
import { IChef } from '../../types/chef';
import { getDistance } from '../../util';

export const Chef = ({ position, goTo, ...rest }: Partial<IChef>) => {
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const dispatch = useDispatch();

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
    <>
      <mesh ref={objectRef}>
        <sphereGeometry args={[0.32]} />
        <meshMatcapMaterial color={'yello'} />
      </mesh>
    </>
  );
};
