/* eslint-disable @typescript-eslint/no-unused-vars */
// export interface CustomerCreated extends IEvent {
//     customer: ICustomer;
//   }

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cashRegister, chefs } from '../constant';
import { addCashRegister, getCashReisters } from '../redux/reduser/game/cash-register';
import { addChef } from '../redux/reduser/game/chefs';
import { addCustomer, getCustomers } from '../redux/reduser/game/customers';
import { ICashRegister } from '../types/cash-register';
import { IChef } from '../types/chef';
import * as events from '../types/events';
import { getDistance } from '../util';

//   export interface CustomerInQueue extends IEvent {
//     customer: ICustomer;
//     cashRegister: ICashRegister;
//   }

//   export interface OrderAccepted extends IEvent {
//     customer: ICustomer;
//     order: IOrder;
//   }

//   export interface OrderCompleted extends IEvent {
//     order: IOrder;
//   }

//   export interface ChefChangeStatus extends IEvent {
//     status: IChef['status'];
//     cookId: string | number;
//   }

//   export interface DishPreparationStarted extends IEvent {
//     dish: IPizza;
//     cood: IChef;
//     nextDishState: IPizza['state'];
//   }

//   export interface DishPreparationCompleted extends IEvent {
//     dish: IPizza;
//     cook: IChef;
//     newDishState: IPizza['state'];
//   }

export const useManager = () => {
  const dispatch = useDispatch();
  const lobbyCashRegisters = useSelector(getCashReisters);
  const customers = useSelector(getCustomers);

  const onGameStart = useCallback(
    (setting: any) => {
      setting?.chefs?.forEach((chef: IChef, index: number) =>
        dispatch(addChef({ ...chef, position: chefs.positions[index] })),
      );
      setting?.cashRegisters?.forEach((cash: ICashRegister, index: number) =>
        dispatch(
          addCashRegister({
            ...cash,
            id: cash.uuid as any,
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
              position: freePosition,
              cashRegisterId: cash.uuid,
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
  const onOrderAccepted = useCallback((_event: events.OrderAccepted) => {}, []);
  const onOrderCompleted = useCallback((_event: events.OrderCompleted) => {}, []);
  const onChefChangeStatus = useCallback((_event: events.ChefChangeStatus) => {}, []);
  const onDishPreparationStarted = useCallback((_event: events.DishPreparationStarted) => {}, []);
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
