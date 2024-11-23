import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cashRegister, chefs } from '../constant';
import {
  addCashRegister,
  getCashRegisters,
  removeCashRegisterById,
} from '../redux/reduser/game/cash-register';
import { addChef, getChefs, removeChefById, updateChef } from '../redux/reduser/game/chefs';
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
  const onCustomerCreated = useCallback((event: events.CustomerCreated) => {
    console.log('Customer created event', event);
  }, []);
  const onCustomerInQueue = useCallback(
    (event: events.CustomerInQueue) => {
      let cash = lobbyCashRegisters.find((cash) => String(cash.id) == event.cashRegisterId);
      if (!cash) {
        cash = lobbyCashRegisters.find((cash) => typeof cash.id === 'number');
        dispatch(addCashRegister({ ...cash, id: event.cashRegisterId } as any));
        dispatch(removeCashRegisterById(cash?.id as any));
      }

      if (cash) {
        const freePosition = cash.available.find(
          (pos) => !customers.some(({ position }) => getDistance(position as any, pos) < 0.5),
        );

        if (freePosition) {
          dispatch(
            addCustomer({
              id: event.customerId as unknown as number,
              order: null,
              status: 'in-queue',
              position: cash.available[cash.available.length - 1],
              cashRegisterId: event.cashRegisterId,
            }),
          );
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
  const onOrderAccepted = useCallback(
    (_event: events.OrderAccepted) => {
      const customer = customers.find((customer) => String(customer.id) === _event.customerId);
      const cash = lobbyCashRegisters.find((cash) => String(cash.id) == _event.cashRegisterId);
      if (customer && cash) {
        dispatch(
          updateCustomer({
            ...customer,
            order: {
              id: _event.orderId,
              createdAt: new Date(_event.acceptedAt),
              orderItems: _event.orderItems.map((item) => ({ menuItem: { name: item, ingridients: [] } })),
              uncompletedOrderItems: [],
              cashRegister: cash,
            },
            status: 'in-queue',
          }),
        );
      } else {
        console.error('Customer not found', _event);
      }
    },
    [customers, dispatch, lobbyCashRegisters],
  );
  const onOrderCompleted = useCallback(
    (event: events.OrderCompleted) => {
      const cash = lobbyCashRegisters.find((cash) => String(cash.id) === event.cashRegisterId);
      const customer = customers.find((customer) => String(customer.id) === event.customerId);
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
  const onChefChangeStatus = useCallback((_event: any) => {
    console.log('Chef change status event', _event);
  }, []);
  const onDishPreparationStarted = useCallback(
    (event: events.DishPreparationStarted) => {
      const { cookId, nextDishState } = event;
      let chef = cooks.find((ch) => String(ch.id) === cookId);
      if (!chef) {
        chef = cooks.find((ch) => typeof ch.id === 'number');
        dispatch(addChef({ ...chef, id: cookId } as any));
        dispatch(removeChefById(chef?.id as any));
      }

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
  const onDishPreparationCompleted = useCallback((_event: events.DishPreparationCompleted) => {
    console.log('Dish preparation completed event', _event);
  }, []);

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
