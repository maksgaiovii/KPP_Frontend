import { useSelector } from 'react-redux';
import { cashRegister } from '../../constant';
import { getCustomers } from '../../redux/reduser/game/customers';
import { selectAmountOfCashRegisters } from '../../redux/reduser/setting';
import { CashRegister } from './cash-register';
import { Customer } from './customer';

export const Lobby: React.FC = () => {
  const count = useSelector(selectAmountOfCashRegisters);
  const customers = useSelector(getCustomers);

  return (
    <>
      <mesh position={[0, -0.5, 12.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[10, 1, 15]} />
        <meshStandardMaterial color="#8F6F47" />

        {cashRegister.positions.slice(0, Number(count)).map((position, index) => (
          <CashRegister position={position} key={'csre' + index} />
        ))}

        {/* draw basl */}

        {customers.map((customer, index) => (
          <Customer key={'customer' + index} {...customer} />
        ))}

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
