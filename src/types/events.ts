import { IPizza } from './pizza';

export interface CustomerCreated {
  type: 'customer:created';
  customerId: string;
  customerName: string;
  createdAt: string;
}

export interface DishPreparationStarted {
  type: 'dish:preparationStarted';
  dishID: string;
  dishName: string;
  nextDishState: IPizza['state'];
  cookId: string;
}

export interface DishPreparationCompleted {
  type: 'dish:preparationCompleted';
  dishID: string;
  dishName: string;
  newDishState: IPizza['state'];
  cookId: string;
}

export interface CustomerInQueue {
  type: 'customer:inQueue';
  customerId: string;
  cashRegisterId: string;
}

export interface OrderAccepted {
  type: 'order:accepted';
  orderId: string;
  orderItems: string[];
  customerId: string;
  cashRegisterId: string;
  acceptedAt: string;
}

export interface OrderCompleted {
  type: 'order:completed';
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
