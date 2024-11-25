import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import * as constants from '../constant';
import { getCashRegisters } from '../redux/reduser/game/cash-register';
import { getChefs } from '../redux/reduser/game/chefs';
import { useCustomerContext } from '../redux/reduser/game/customers';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks, selectCookingStrategy } from '../redux/reduser/setting';
import { setSimulationConfig } from '../socket';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { useManager } from './useManager';

// global && Object.assign(global, { WebSocket });

type OnStartProps = {
  isPlaying: boolean;
  isStarted: boolean;
  terminate: boolean;
  afterStart?: () => void;
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

const getStaticChefs = (count: number | string) => chefs.slice(0, Number(count));
const getStaticCashRegisters = (count: number | string) => cashRegisters.slice(0, Number(count));

export const useStart = ({ isPlaying, terminate, isStarted, afterStart }: OnStartProps) => {
  const [socket, setSocket] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [currentEvent, setCurrentEvent] = useState<any>(null);

  const dispatch = useDispatch();
  const [countOfCashRegisters, countOfCooks, cookingStrategy] = [
    useSelector(selectAmountOfCashRegisters),
    useSelector(selectAmountOfCooks),
    useSelector(selectCookingStrategy),
  ];
  const lobbyCashRegisters = useSelector(getCashRegisters);
  const cooks = useSelector(getChefs);

  const {
    dispatch: updateCustomer,
    state: { customers },
  } = useCustomerContext();

  const {
    onGameStart,
    onCustomerInQueue,
    onOrderAccepted,
    onOrderCompleted,
    onDishPreparationStarted,
    onCustomerCreated,
  } = useManager();

  useEffect(() => {
    if (isPlaying) {
      if (!isStarted) {
        setSimulationConfig({
          cooksNumber: Number(countOfCooks),
          cashRegistersNumber: Number(countOfCashRegisters),
          specializedCooksMode: cookingStrategy === 'm:m',
        }).finally(() => {
          afterStart?.();
        });
        onGameStart({
          chefs: getStaticChefs(countOfCooks),
          cashRegisters: getStaticCashRegisters(countOfCashRegisters),
        });
      }
    }

    if (terminate) {
      dispatch(setMenuState('preview'));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, terminate, dispatch, countOfCooks, countOfCashRegisters, onGameStart, isStarted, cookingStrategy]);

  const eventHandlers = useMemo(
    () => ({
      'customer-created': onCustomerCreated,
      'new-customer-in-queue': onCustomerInQueue,
      'order-accepted': onOrderAccepted,
      'order-completed': onOrderCompleted,
      'dish-preparation-started': onDishPreparationStarted,
    }),
    [onCustomerInQueue, onOrderAccepted, onOrderCompleted, onDishPreparationStarted, onCustomerCreated],
  );

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      onConnect: () => {
        setSocket(client);
      },
      onStompError: (frame) => {
        console.error(frame, 'onStompError');
      },
      onWebSocketClose: (evt) => {
        console.error(evt, 'onWebSocketClose');
      },
      onDisconnect: () => {
        console.error('onDisconnect');
      },
    });

    client.activate();

    return () => {
      client.deactivate();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      Object.entries(eventHandlers).forEach(([event]) => {
        socket.subscribe(`/topic/${event}`, (message: any) => {
          const body = JSON.parse(message.body);
          setEvents((prev) => [...prev, { message: body, event }]);
        });
      });
    }
  }, [socket, eventHandlers]);

  useEffect(() => {
    if (currentEvent) return;
    setCurrentEvent(events[0]);
    setEvents((prev) => prev.slice(1));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events[0], currentEvent]);

  useEffect(() => {
    if (currentEvent) {
      const timeout = setTimeout(() => {
        const { message, event: eventName } = currentEvent;
        console.log('event', eventName, message, Date.now());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eventHandlers[eventName](message, { customers, dispatch, cooks, lobbyCashRegisters, updateCustomer });
        setCurrentEvent(null);
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [cooks, currentEvent, customers, dispatch, eventHandlers, lobbyCashRegisters, updateCustomer]);

  return { eventHandlers };
};
