import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { cashRegister, chefs } from '../constant';
import { addCashRegister, removeCashRegisterById } from '../redux/reduser/game/cash-register';
import { addChef, removeChefById, updateChef } from '../redux/reduser/game/chefs';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import * as events from '../types/events';
import { getDistance } from '../util';

type Options = {
  lobbyCashRegisters: ICashRegister[];
  customers: any[];
  dispatch: (_arg0: any) => void;
  updateCustomer: (_arg0: { type: string; payload: any }) => void;
  cooks?: IChef[];
};

export const useManager = () => {
  const dispatch = useDispatch();

  const onGameStart = useCallback(
    (setting: any) => {
      setting?.chefs?.forEach((chef: IChef, index: number) =>
        dispatch(addChef({ ...chef, position: chefs.positions[index] })),
      );
      setting?.cashRegisters?.forEach((cash: ICashRegister, index: number) =>
        dispatch(
          addCashRegister({
            ...cash,
            position: cashRegister.positions[index],
            available: cashRegister.avaibleQueuePositions[index],
          }),
        ),
      );
    },
    [dispatch],
  );
  const onCustomerCreated = useCallback(
    (event: events.CustomerCreated, { lobbyCashRegisters, updateCustomer }: Options) => {
      const cash = lobbyCashRegisters[0];
      if (cash) {
        const freePosition = cash.available[cash.available.length - 1];

        if (freePosition) {
          updateCustomer({
            type: 'ADD_CUSTOMER',
            payload: {
              id: event.customerId as unknown as number,
              order: null,
              status: 'in-queue',
              position: freePosition,
              cashRegisterId: null,
            },
          });
        }
      }
    },
    [],
  );

  const onCustomerInQueue = useCallback(
    (event: events.CustomerInQueue, { customers, dispatch, lobbyCashRegisters, updateCustomer }: Options) => {
      let cash = lobbyCashRegisters.find((cash) => String(cash.id) == event.cashRegisterId);
      if (!cash) {
        cash = lobbyCashRegisters.find((cash) => typeof cash.id === 'number');
        dispatch(addCashRegister({ ...cash, id: event.cashRegisterId } as any));
        dispatch(removeCashRegisterById(cash?.id as any));
      }

      if (cash) {
        const freePosition = cash.available.find(
          (pos) => !customers!.some(({ position }) => getDistance(position as any, pos) < 0.5),
        );

        if (freePosition) {
          updateCustomer({
            type: 'UPDATE_CUSTOMER',
            payload: {
              id: event.customerId as unknown as number,
              order: null,
              status: 'in-queue',
              goTo: [cash.available[cash.available.length - 1], freePosition],
              cashRegisterId: event.cashRegisterId,
            },
          });
        } else {
          setTimeout(() => {
            onCustomerInQueue(event, { customers, dispatch, lobbyCashRegisters } as any);
          }, 9000);
        }
      }
    },
    [],
  );
  const onOrderAccepted = useCallback(
    (_event: events.OrderAccepted, { customers, lobbyCashRegisters, updateCustomer }: Options) => {
      const customer = customers!.find((customer) => String(customer.id) === _event.customerId);
      const cash = lobbyCashRegisters.find((cash) => String(cash.id) == _event.cashRegisterId);
      if (customer && cash) {
        updateCustomer({
          type: 'UPDATE_CUSTOMER',
          payload: {
            ...customer,
            order: {
              id: _event.orderId,
              createdAt: new Date(_event.acceptedAt),
              orderItems: _event.orderItems.map((item) => ({ menuItem: { name: item, ingridients: [] } })),
              uncompletedOrderItems: [],
              cashRegister: cash,
            },
            status: 'in-queue',
          },
        });
      }
    },
    [],
  );
  const onOrderCompleted = useCallback(
    (event: events.OrderCompleted, { customers, lobbyCashRegisters, updateCustomer }: Options) => {
      const cash = lobbyCashRegisters.find((cash) => String(cash.id) === event.cashRegisterId);
      const customer = customers.find((customer) => String(customer.id) === event.customerId);
      console.log('onOrderCompleted', event, customer, cash, customers);

      updateCustomer({
        type: 'UPDATE_CUSTOMER',
        payload: { ...customer, goTo: cash?.outPositions } as any,
      });

      cash!.available.forEach((pos, idx, arr) => {
        if (idx + 1 < arr.length) {
          const customer = customers
            .filter(({ position }) => !position)
            .find(({ position }) => getDistance(position as any, arr[idx + 1] as any) < 0.5);
          if (customer) {
            updateCustomer({ type: 'UPDATE_CUSTOMER', payload: { ...customer, goTo: [pos] } as any });
          }
        }
      });
    },
    [],
  );
  const onDishPreparationStarted = useCallback(
    (event: events.DishPreparationStarted, { cooks = [], dispatch }: Options) => {
      const { cookId, nextDishState } = event;
      let chef = cooks.find((ch) => String(ch.id) === cookId);
      if (!chef) {
        chef = cooks.find((ch) => typeof ch.id === 'number');
        dispatch(addChef({ ...chef, id: cookId } as any));
        dispatch(removeChefById(chef?.id as any));
        console.log('chef', chef, cooks, event, 'change chef id');
      }

      if (chef) {
        console.log(nextDishState, 'nextDishState');
        const newPosition = ['BAKED'].includes(nextDishState)
          ? chefs.ovenPositions[chef.index]
          : ['COMPLATED'].includes(nextDishState)
            ? chefs.final[chef.index]
            : chefs.positions[chef.index];

        dispatch(updateChef({ ...chef, goTo: [newPosition] }));
      }
    },
    [],
  );

  return {
    onGameStart,
    onCustomerCreated,
    onCustomerInQueue,
    onOrderAccepted,
    onOrderCompleted,
    onDishPreparationStarted,
  };
};
