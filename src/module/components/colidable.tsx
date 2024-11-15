/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { BodyProps, BoxProps, PublicApi, useBox } from '@react-three/cannon';
import { DependencyList, Ref } from 'react';

type GetByIndex<T extends BodyProps> = (index: number) => T;

type CollidableProps = {
  fn: GetByIndex<BoxProps>;
  fwdRef?: Ref<any>;
  deps?: DependencyList;
  children: (props: { refference: React.RefObject<any>; api: PublicApi }) => React.ReactNode;
};

export const Collidable = ({ fn, fwdRef, deps, children }: CollidableProps) => {
  const [refference, api] = useBox(fn, fwdRef, deps);

  return <>{children({ refference, api })}</>;
};
