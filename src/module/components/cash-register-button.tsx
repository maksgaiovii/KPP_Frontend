// import { Text } from '@react-three/drei';

// interface CashRegisterButton {
//   position: [number, number, number];  // Позиція кнопки
//   text: string;                         // Текст на кнопці
//   color: string;                        // Колір кнопки
//   onClick: () => void;                  // Обробник події натискання
// }

// const ButtonWithText: React.FC<CashRegisterButton> = ({ position, text, color, onClick }) => {
//   return (
//     <mesh position={position} onClick={onClick}>
//       <boxGeometry args={[0.3, 0.1, 0.07]} />
//       <meshStandardMaterial color={color} />
      
//       {/* Текст всередині кнопки */}
//       <Text position={[0, 0, 0.06]} fontSize={0.13} color="white" anchorX="center" anchorY="middle">
//         {text}
//       </Text>
//     </mesh>
//   );
// };

// export default ButtonWithText;
