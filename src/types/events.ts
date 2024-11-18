import { ICashRegister } from './cash-register';
import { IChef } from './chef';
import { ICustomer } from './customer';
import { IOrder } from './order';
import { IPizza } from './pizza';

export interface IEvent {
  name: string;
  type: string;
}

export interface CustomerCreated extends IEvent {
  customer: ICustomer;
}

export interface CustomerInQueue extends IEvent {
  customer: ICustomer;
  cashRegister: ICashRegister;
}

export interface OrderAccepted extends IEvent {
  customer: ICustomer;
  order: IOrder;
}

export interface OrderCompleted extends IEvent {
  order: IOrder;
}

export interface ChefChangeStatus extends IEvent {
  status: IChef['status'];
  cookId: string | number;
}

export interface DishPreparationStarted extends IEvent {
  dish: IPizza;
  cook: IChef;
  nextDishState: IPizza['state'];
}

export interface DishPreparationCompleted extends IEvent {
  dish: IPizza;
  cook: IChef;
  newDishState: IPizza['state'];
}
