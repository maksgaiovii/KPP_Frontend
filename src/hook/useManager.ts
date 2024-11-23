/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cashRegister, chefs } from '../constant';
import { addCashRegister, getCashRegisters } from '../redux/reduser/game/cash-register';
import { addChef, getChefs, updateChef } from '../redux/reduser/game/chefs';
import { addCustomer, getCustomers, updateCustomer } from '../redux/reduser/game/customers';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import * as events from '../types/events';
import { getDistance } from '../util';

export const useManager = () => {
  const dispatch = useDispatch();
  const lobbyCashRegisters = useSelector(getCashRegisters);
  const customers = useSelector(getCustomers);
  const cooks = useSelector(getChefs);

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
  const onCustomerCreated = useCallback((_event: events.CustomerCreated) => {}, []);
  const onCustomerInQueue = useCallback(
    (event: events.CustomerInQueue) => {
      const cash = lobbyCashRegisters.find((cash) => cash.id === event.cashRegister.id);
      if (cash) {
        const freePosition = cash.available.find(
          (pos) => !customers.some(({ position }) => getDistance(position as any, pos) < 0.5),
        );

        if (freePosition) {
          dispatch(
            addCustomer({
              ...event.customer,
              position: cash.available[cash.available.length - 1],
              cashRegisterId: cash.id as any,
            }),
          );
          setTimeout(() => {
            dispatch(updateCustomer({ ...event.customer, goTo: [freePosition] } as any));
          }, 1000);
        } else {
          setTimeout(() => {
            onCustomerInQueue(event);
          }, 9000);
        }
      } else {
        console.error('Cash register not found');
      }
    },
    [customers, dispatch, lobbyCashRegisters],
  );
  const onOrderAccepted = useCallback((_event: events.OrderAccepted) => {}, []);
  const onOrderCompleted = useCallback(
    (event: events.OrderCompleted) => {
      const cash = lobbyCashRegisters.find((cash) => cash.id === event.order.cashRegister!.id!);
      const customer = customers.find((customer) => customer.order.id === event.order.id);
      dispatch(updateCustomer({ ...customer, goTo: cash?.outPositions } as any));

      cash!.available.forEach((pos, idx, arr) => {
        if (idx + 1 < arr.length) {
          const customer = customers
            .filter(({ position }) => !position)
            .find(({ position }) => getDistance(position as any, arr[idx + 1] as any) < 0.5);
          if (customer) {
            dispatch(updateCustomer({ ...customer, goTo: [pos] } as any));
          }
        }
      });
    },
    [customers, dispatch, lobbyCashRegisters],
  );
  const onChefChangeStatus = useCallback((_event: events.ChefChangeStatus) => {}, []);
  const onDishPreparationStarted = useCallback(
    (event: events.DishPreparationStarted) => {
      const { cook, nextDishState } = event;
      const chef = cooks.find((ch) => ch.id === cook.id);
      if (chef) {
        const newPosition = ['baking'].includes(nextDishState)
          ? chefs.ovenPositions[chef.index]
          : ['completed'].includes(nextDishState)
            ? chefs.final[chef.index]
            : chefs.positions[chef.index];

        dispatch(updateChef({ ...chef, goTo: [newPosition] }));
      }
    },
    [cooks, dispatch],
  );
  const onDishPreparationCompleted = useCallback((_event: events.DishPreparationCompleted) => {}, []);

  return {
    onGameStart,
    onCustomerCreated,
    onCustomerInQueue,
    onOrderAccepted,
    onOrderCompleted,
    onChefChangeStatus,
    onDishPreparationStarted,
    onDishPreparationCompleted,
  };
};
