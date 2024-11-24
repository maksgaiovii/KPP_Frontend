import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { WebSocket } from 'ws';
import * as constants from '../constant';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks, selectCookingStrategy } from '../redux/reduser/setting';
import { setSimulationConfig } from '../socket';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { useManager } from './useManager';

// global && Object.assign(global, { WebSocket });

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
    onCustomerInQueue,
    onOrderAccepted,
    onOrderCompleted,
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

  const eventHandlers = useMemo(
    () => ({
      'new-customer-in-queue': onCustomerInQueue,
      'order-accepted': onOrderAccepted,
      'order-completed': onOrderCompleted,
      'dish-preparation-started': onDishPreparationStarted,
      'dish-preparation-completed': onDishPreparationCompleted,
    }),
    [onCustomerInQueue, onOrderAccepted, onOrderCompleted, onDishPreparationStarted, onDishPreparationCompleted],
  );

  return { eventHandlers };
};
