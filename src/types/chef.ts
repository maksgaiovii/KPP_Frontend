import { I3DObject } from '.';
import { IPizza } from './pizza';

export interface IChef extends I3DObject {
  status: 'free' | 'busy' | 'paused';
  near: 'table' | 'oven' | 'counter';
  pizza?: IPizza;
}
