import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from '../constant';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks } from '../redux/reduser/setting';
import { registerSocketHandlers, unregisterSocketHandlers } from '../socket';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { IEvent } from '../types/events';
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
  const dispatch = useDispatch();
  const [countOfCashRegisters, countOfCooks] = [
    useSelector(selectAmountOfCashRegisters),
    useSelector(selectAmountOfCooks),
  ];
  const [events, setEvents] = useState<IEvent[]>([]);
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
    // Ініціалізація гри
    if (isPlaying) {
      onGameStart({
        chefs: getChefs(countOfCooks),
        cashRegisters: getCashRegisters(countOfCashRegisters),
      });
    }

    // Закриття гри
    if (terminate) {
      dispatch(setMenuState('preview'));
    }
  }, [isPlaying, terminate, dispatch, countOfCooks, countOfCashRegisters, onGameStart]);

  useEffect(() => {
    // Реєстрація сокетів
    const handlers = {
      customerCreated: onCustomerCreated,
      customerInQueue: onCustomerInQueue,
      orderAccepted: onOrderAccepted,
      orderCompleted: onOrderCompleted,
      chefChangeStatus: onChefChangeStatus,
      dishPreparationStarted: onDishPreparationStarted,
      dishPreparationCompleted: onDishPreparationCompleted,
    };

    registerSocketHandlers(handlers);

    return () => {
      // Видалення обробників при анмаунті
      unregisterSocketHandlers(Object.keys(handlers) as (keyof typeof handlers)[]);
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

  return { events, setEvents };
};
