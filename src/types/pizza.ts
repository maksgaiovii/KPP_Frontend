import { I3DObject } from '.';

export interface IPizza extends I3DObject {
  uuid: string;
  isCompleted: boolean;
  state:
    | 'initial'
    | 'dough preparation'
    | 'dough rolling'
    | 'sauce addition'
    | 'topping addition'
    | 'baking'
    | 'finishing touches'
    | 'completed';
  ingredients: string[];
}

export type PizzaState = IPizza['state'];
