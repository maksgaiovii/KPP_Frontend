import { I3DObject } from '.';
import { IOrder } from './order';

export interface ICustomer extends I3DObject {
  order: IOrder;
  status: 'in-queue' | 'near-cash' | 'near-table';
}
