import { IPizza } from './pizza';

export interface CustomerCreated {
  customerId: string;
  customerName: string;
  createdAt: string;
}

export interface DishPreparationStarted {
  dishID: string;
  dishName: string;
  nextDishState: IPizza['state'];
  cookId: string;
}

export interface DishPreparationCompleted {
  dishID: string;
  dishName: string;
  newDishState: IPizza['state'];
  cookId: string;
}

export interface CustomerInQueue {
  customerId: string;
  cashRegisterId: string;
}

export interface OrderAccepted {
  orderId: string;
  orderItems: string[];
  customerId: string;
  cashRegisterId: string;
  acceptedAt: string;
}

export interface OrderCompleted {
  orderId: string;
  customerId: string;
  cashRegisterId: string;
  completedAt: string;
}

export type IEvent =
  | CustomerCreated
  | DishPreparationStarted
  | DishPreparationCompleted
  | CustomerInQueue
  | OrderAccepted
  | OrderCompleted;
