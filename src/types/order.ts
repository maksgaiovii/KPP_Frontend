import { ICashRegister } from './cash-register';

export interface IOrderItem {
  menuItem: {
    name: string;
    ingridients: string[];
  };
}

export interface IOrder {
  createdAt: Date;
  orderItems: IOrderItem[];
  uncompletedOrderItems: IOrderItem[];
  cashRegister?: ICashRegister;
  completedAt?: Date;
}
