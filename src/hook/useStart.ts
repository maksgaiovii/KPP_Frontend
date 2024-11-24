import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from '../constant';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks, selectCookingStrategy } from '../redux/reduser/setting';
import { setSimulationConfig, socket } from '../socket';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { useManager } from './useManager';
import { IEvent, CustomerCreated, DishPreparationStarted, DishPreparationCompleted, CustomerInQueue, OrderAccepted, OrderCompleted } from '../types/events';

type OnStartProps = {
  isPlaying: boolean;
  terminate: boolean;
};

type EventHandlers = {
  'customer:created': (event: CustomerCreated) => void;
  'customer:inQueue': (event: CustomerInQueue) => void;
  'order:accepted': (event: OrderAccepted) => void;
  'order:completed': (event: OrderCompleted) => void;
  'chef:changeStatus': (event: any) => void;
  'dish:preparationStarted': (event: DishPreparationStarted) => void;
  'dish:preparationCompleted': (event: DishPreparationCompleted) => void;
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

  const eventHandlers: EventHandlers = {
    'customer:created': onCustomerCreated,
    'customer:inQueue': onCustomerInQueue,
    'order:accepted': onOrderAccepted,
    'order:completed': onOrderCompleted,
    'chef:changeStatus': onChefChangeStatus,
    'dish:preparationStarted': onDishPreparationStarted,
    'dish:preparationCompleted': onDishPreparationCompleted,
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      const message: IEvent = JSON.parse(event.data);

      const handler = eventHandlers[message.type as keyof EventHandlers];

      if (handler) {

        handler(message);
      } else {
        console.warn('Невідома подія:', message.type);
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
