import { I3DObject } from '.';

export interface IPizza extends I3DObject {
  uuid: string;
  isCompleted: boolean;
  state:
    | 'INITIAL'
    | 'DOUGH_PREPARED'
    | 'DOUGH_ROLLED'
    | 'SAUCE_ADDED'
    | 'TOPPING_ADDED'
    | 'BAKED'
    | 'FINISHING_TOUCHES'
    | 'COMPLETED';
  ingredients: string[];
}

export type PizzaState = IPizza['state'];
