import { useState } from 'react';
import { CashRegister } from './cash-register';

export const Lobby: React.FC = () => {
  return (
    <>
      <mesh position={[0, -0.5, 10]} rotation={[0, 0, 0]}>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial color="#8F6F47" />

        <CashRegister position={[-3, 1.5, -2]} />
        <CashRegister position={[-3, 1.5, 1]} />
        <CashRegister position={[-3, 1.5, 4]} />

        <CashRegister position={[3, 1.5, -2]} />
        <CashRegister position={[3, 1.5, 1]} />
        <CashRegister position={[3, 1.5, 4]} />

        <pointLight position={[-3, 1, -2]} intensity={6} color="white" />
        <pointLight position={[-3, 1, 1]} intensity={6} color="white" />
        <pointLight position={[-3, 1, 4]} intensity={6} color="white" />

        <pointLight position={[3, 1, -2]} intensity={6} color="white" />
        <pointLight position={[3, 1, 1]} intensity={6} color="white" />
        <pointLight position={[3, 1, 4]} intensity={6} color="white" />

        <mesh position={[0, 1.1, -4]} rotation={[0, 0, 0]}>
          <boxGeometry args={[10, 1.25, 0.5]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>

        <mesh position={[0, 1.8, -4]} rotation={[0, 0, 0]}>
          <boxGeometry args={[10, 0.1, 1.5]} />
          <meshStandardMaterial color="#A52A2A" />
        </mesh>
      </mesh>
    </>
  );
};
