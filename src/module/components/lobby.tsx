import { useSelector } from 'react-redux';
import { getCashRegisters } from '../../redux/reduser/game/cash-register';
import { useCustomerContext } from '../../redux/reduser/game/customers';
import { CashRegister } from './cash-register';
import { Customer } from './customer';

export const Lobby: React.FC = () => {
  const cashRegister = useSelector(getCashRegisters);
  const {
    state: { customers },
  } = useCustomerContext();
  return (
    <>
      <mesh position={[0, -0.5, 12.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[10, 1, 15]} />
        <meshStandardMaterial color="#8F6F47" />

        {cashRegister.map((cash: any, index) => (
          <CashRegister {...cash} key={'csre' + index} />
        ))}
        {customers.map((customer, index) => (
          <Customer key={'customer' + index} {...customer} />
        ))}

        <mesh position={[0, 1.12, -7.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[10, 1.25, 0.5]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>

        <mesh position={[0, 1.81, -7.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[10, 0.1, 1.5]} />
          <meshStandardMaterial color="#A52A2A" />
        </mesh>
      </mesh>
    </>
  );
};
