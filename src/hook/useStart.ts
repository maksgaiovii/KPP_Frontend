import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from '../constant';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks, selectCookingStrategy } from '../redux/reduser/setting';
import { sendStartRequest, sendStopRequest, setSimulationConfig, socket } from '../socket';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { useManager } from './useManager';

type OnStartProps = {
  isPlaying: boolean;
  terminate: boolean;
};

const cashRegisters: ICashRegister[] = constants.cashRegister.positions.map(
  (position, index) =>
    ({
      id: index,
      position,
      available: constants.cashRegister.avaibleQueuePositions[index],
      outPositions: constants.cashRegister.outPositions[index],
    }) as ICashRegister,
);

const chefs = constants.chefs.positions.map(
  (position, index) =>
    ({
      id: index,
      index,
      position,
      near: 'table',
    }) as IChef,
);

const getChefs = (count: number | string) => chefs.slice(0, Number(count));
const getCashRegisters = (count: number | string) => cashRegisters.slice(0, Number(count));

export const useStart = ({ isPlaying, terminate }: OnStartProps) => {
  const [isStarted, setIsStarted] = useState(false);

  const dispatch = useDispatch();
  const [countOfCashRegisters, countOfCooks, cookingStrategy] = [
    useSelector(selectAmountOfCashRegisters),
    useSelector(selectAmountOfCooks),
    useSelector(selectCookingStrategy),
  ];
  const {
    onGameStart,
    onCustomerCreated,
    onCustomerInQueue,
    onOrderAccepted,
    onOrderCompleted,
    onChefChangeStatus,
    onDishPreparationStarted,
    onDishPreparationCompleted,
  } = useManager();

  useEffect(() => {
    if (isPlaying) {
      if (!isStarted) {
        setSimulationConfig({
          cooksNumber: Number(countOfCooks),
          cashRegistersNumber: Number(countOfCashRegisters),
          specializedCooksMode: cookingStrategy === 'm:m',
        });
        onGameStart({
          chefs: getChefs(countOfCooks),
          cashRegisters: getCashRegisters(countOfCashRegisters),
        });
        setIsStarted(true);
      }
    }

    if (terminate) {
      dispatch(setMenuState('preview'));
    }
  }, [isPlaying, terminate, dispatch, countOfCooks, countOfCashRegisters, onGameStart, isStarted, cookingStrategy]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'customer:created':
          onCustomerCreated(message.data);
          break;
        case 'customer:inQueue':
          onCustomerInQueue(message.data);
          break;
        case 'order:accepted':
          onOrderAccepted(message.data);
          break;
        case 'order:completed':
          onOrderCompleted(message.data);
          break;
        case 'chef:changeStatus':
          onChefChangeStatus(message.data);
          break;
        case 'dish:preparationStarted':
          onDishPreparationStarted(message.data);
          break;
        case 'dish:preparationCompleted':
          onDishPreparationCompleted(message.data);
          break;
        default:
          console.warn('Невідома подія:', message.type);
          break;
      }
    };

    return () => {
      // socket.close();
    };
  }, [
    onCustomerCreated,
    onCustomerInQueue,
    onOrderAccepted,
    onOrderCompleted,
    onChefChangeStatus,
    onDishPreparationStarted,
    onDishPreparationCompleted,
  ]);
};
