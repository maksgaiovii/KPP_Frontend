import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMoveAlongPoints } from '../../hook/useMoveAlongPoints';
import { updateCustomer } from '../../redux/reduser/game/customers';
import { ICustomer } from '../../types/customer';
import { getDistance } from '../../util';

export const Customer = ({ position, goTo, ...rest }: ICustomer) => {
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const dispatch = useDispatch();

  const { objectRef } = useMoveAlongPoints(positions, 0.1, (index, points) => {
    setTimeout(() => {
      // без setTimeout утворюється зациклення, відкрий консоль
      dispatch(updateCustomer({ ...rest, position: points[index] } as any));
    }, 1);
    console.log(`Досягнуто точки: ${index}`, points);
  });

  const handleClick = useCallback(() => {
    setPositions((pev) => [...pev, [0, 2, 0], [0, 2, 2], [0, 2, 4]]);
  }, []);

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
      <mesh ref={objectRef} onClick={handleClick}>
        <sphereGeometry args={[0.32]} />
        <meshMatcapMaterial color={'#0b132b'} />
      </mesh>
    </>
  );
};
