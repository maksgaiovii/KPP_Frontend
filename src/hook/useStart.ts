import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from '../constant';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks } from '../redux/reduser/setting';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { useManager } from './useManager';

type OnStartProps = {
  isPlaying: boolean;
  terminate: boolean;
};

const socket = new WebSocket('ws://localhost:8080/websocket');

socket.onopen = () => {
  console.log('Connected to the server');
};

socket.onerror = (error) => {
  console.error('Connection error:', error);
};

socket.onclose = () => {
  console.log('Disconnected from server');
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

const sendStartRequest = async () => {
  try {
    const response = await fetch('http://localhost:8080/simulation/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Success:', data.message);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
};

const getChefs = (count: number | string) => chefs.slice(0, Number(count));
const getCashRegisters = (count: number | string) => cashRegisters.slice(0, Number(count));

export const useStart = ({ isPlaying, terminate }: OnStartProps) => {
  const dispatch = useDispatch();
  const [countOfCashRegisters, countOfCooks] = [
    useSelector(selectAmountOfCashRegisters),
    useSelector(selectAmountOfCooks),
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
      onGameStart({
        chefs: getChefs(countOfCooks),
        cashRegisters: getCashRegisters(countOfCashRegisters),
      });

      sendStartRequest();
    }

    if (terminate) {
      dispatch(setMenuState('preview'));
    }
  }, [isPlaying, terminate, dispatch, countOfCooks, countOfCashRegisters, onGameStart]);

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
