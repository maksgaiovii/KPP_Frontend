import { useState } from 'react';
import { CashRegister } from './cash-register';


export const Lobby: React.FC = () => {
    return (
      <>
        <mesh position={[0, -0.5, 10]} rotation={[0, 0, 0]}>
          <boxGeometry args={[10, 1, 10]} />
          <meshStandardMaterial color="#8F6F47" />
        </mesh>
  
        <CashRegister position={[-3, 0, 3]} />
        <CashRegister position={[3, 0, 3]} />
      </>
    );
  };