import { I3DObject } from '.';
import { ICustomer } from './customer';

export interface ICashRegister extends I3DObject {
  uuid: string;
  status?: 'free' | 'busy';
  customer?: ICustomer;
  customersQueue?: ICustomer[];
  available: [number, number, number][];
}
