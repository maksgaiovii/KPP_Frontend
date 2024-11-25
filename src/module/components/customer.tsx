import { useEffect, useState } from 'react';
import { useMoveAlongPoints } from '../../hook/useMoveAlongPoints';
import { useCustomerContext } from '../../redux/reduser/game/customers';
import { ICustomer } from '../../types/customer';
import { getDistance } from '../../util';
import CustomerModel3D from './Models3D/ClientModel3D';

export const Customer = ({ position, goTo, ...rest }: ICustomer) => {
  const [positions, setPositions] = useState<[number, number, number][]>([]);

  const { dispatch } = useCustomerContext();

  const { objectRef } = useMoveAlongPoints(positions, 0.05, (index, points) => {
    setTimeout(() => {
      // без setTimeout утворюється зациклення, відкрий консоль
      dispatch({
        type: 'UPDATE_CUSTOMER',
        payload: { ...rest, position: points[index] } as any,
      });
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

  if ((position as any)?.[2] > 8) return null;

  return (
    <>
      <mesh ref={objectRef}>
        <CustomerModel3D
          bodyColor="lightgrey"
          headColor="peachpuff"
          limbColor="lightgrey"
          hatColor="darkblue"
          shirtColor="skyblue"
          pantsColor="darkgrey"
          shoesColor="black"
          accessoryColor="red"
        />
      </mesh>
    </>
  );
};
