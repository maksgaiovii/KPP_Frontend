import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from '../constant';
import { setMenuState } from '../redux/reduser/menu';
import { selectAmountOfCashRegisters, selectAmountOfCooks } from '../redux/reduser/setting';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import { ICustomer } from '../types/customer';
import { CustomerInQueue, DishPreparationStarted, IEvent, OrderCompleted } from '../types/events';
import { useManager } from './useManager';

type OnSartProps = {
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

export const useStart = ({ isPlaying, terminate }: OnSartProps) => {
  const dispatch = useDispatch();
  const [countOfCashRegisters, countOfCooks] = [
    useSelector(selectAmountOfCashRegisters),
    useSelector(selectAmountOfCooks),
  ];
  const [events, setEvents] = useState<IEvent[]>(() => [...generateEvent(1, 1), ...generateEvent(2, 2)]);
  const [whichCustomerCookServe, setWhichCustomerCookServe] = useState<string[]>(() =>
    Array.from({ length: Number(selectAmountOfCooks) }, () => ''),
  );

  const { onGameStart, onCustomerInQueue, onDishPreparationStarted, onOrderCompleted } = useManager();

  useEffect(() => {
    const fn = () => {
      if (isPlaying) {
        const eventIdx = 0;
        const event = events[eventIdx] as any;

        if (event) {
          switch (event.type) {
            case 'customerInQueue':
              onCustomerInQueue(event);
              break;
            case 'orderCompleted':
              onOrderCompleted(event);
              setWhichCustomerCookServe((prev) => prev.map((id) => (id === event.name ? '' : id)));
              break;
            case 'dishPreparationStarted':
              onDishPreparationStarted(event);
              break;
          }
          setEvents((prev) => prev.filter((_, idx) => idx !== eventIdx));
        }
      }
    };
    const interval = setInterval(fn, 1000);
    return () => clearInterval(interval);
  }, [events, isPlaying, onCustomerInQueue, onDishPreparationStarted, onOrderCompleted, whichCustomerCookServe]);

  useEffect(() => {
    const fn = () => {
      if (isPlaying && Math.random() > 0.75) {
        let eventIdx = whichCustomerCookServe.findIndex((id) => !id);

        if (eventIdx === -1) {
          eventIdx = Math.floor(Math.random() * whichCustomerCookServe.length);
        }

        const event = generateEvent(Math.floor(Math.random() * Number(countOfCashRegisters)), eventIdx);

        setWhichCustomerCookServe((prev) =>
          prev.map((name, idx) => (idx === eventIdx && !name ? event[1].name! : name || '')),
        );

        setEvents((prev) => mergeArrays(prev, event));
      }
    };

    const interval = setInterval(fn, 1500);
    return () => clearInterval(interval);
  }, [countOfCashRegisters, countOfCooks, isPlaying, whichCustomerCookServe]);

  useEffect(() => {
    onGameStart({
      chefs: getChefs(countOfCooks),
      cashRegisters: getCashRegisters(countOfCashRegisters),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (terminate) {
      dispatch(setMenuState('prewiev'));
    }
  }, [dispatch, terminate]);

  useEffect(() => {
    if (whichCustomerCookServe.length !== Number(countOfCooks)) {
      setWhichCustomerCookServe((prev) => Array.from({ length: Number(countOfCooks) }, (_, idx) => prev[idx] || ''));
    }
  }, [countOfCooks, whichCustomerCookServe.length]);
};

let customerCount = 1;

function generateCustomer({ cashRegisterId }: { cashRegisterId: string | number }): ICustomer {
  return {
    id: customerCount,
    name: 'Customer' + customerCount,
    order: {
      createdAt: new Date(),
      id: customerCount++ as any,
      uncompletedOrderItems: [],
      orderItems: [],
      cashRegister: { id: cashRegisterId } as any,
    },
    cashRegisterId,
    status: 'in-queue',
  };
}

function generateEvent(cashIDX: number, cookId: number) {
  const cashRegister = cashRegisters[cashIDX];
  const cook = chefs[cookId];
  const customer = generateCustomer({ cashRegisterId: cashRegister.id! });
  return [
    {
      type: 'customerInQueue',
      customer,
      cashRegister,
    } as CustomerInQueue,
    {
      cook,
      nextDishState: 'initial',
      type: 'dishPreparationStarted',
      name: customer.id,
    } as DishPreparationStarted,
    {
      cook,
      nextDishState: 'dough preparation',
      type: 'dishPreparationStarted',
      name: customer.id,
    } as DishPreparationStarted,
    {
      cook,
      nextDishState: 'baking',
      type: 'dishPreparationStarted',
      name: customer.id,
    } as DishPreparationStarted,
    {
      cook,
      nextDishState: 'completed',
      type: 'dishPreparationStarted',
      name: customer.id,
    } as DishPreparationStarted,
    {
      type: 'orderCompleted',
      order: customer.order,
      name: customer.id,
    } as OrderCompleted,
  ];
}

function mergeArrays(arr1: any[], arr2: any[]) {
  const copy1 = JSON.parse(JSON.stringify(arr1));
  const copy2 = JSON.parse(JSON.stringify(arr2));

  const randomIdx = Math.floor(Math.random() * (copy1.length + 1));

  return [...copy1.slice(0, randomIdx), copy2[0], ...copy1.slice(randomIdx), ...copy2.slice(1)];
}
