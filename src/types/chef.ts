import { I3DObject } from '.';

export interface IChef extends I3DObject {
  status: 'free' | 'busy' | 'paused';
  near: 'table' | 'oven' | 'counter';
  pizza?: any;
}
