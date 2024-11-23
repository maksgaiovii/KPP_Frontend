import { io, Socket } from 'socket.io-client';
import {
  ChefChangeStatus,
  CustomerCreated,
  CustomerInQueue,
  DishPreparationCompleted,
  DishPreparationStarted,
  OrderAccepted,
  OrderCompleted,
} from '../types/events';

export type SocketEventHandlers = {
  customerCreated: (_payload: CustomerCreated) => void;
  customerInQueue: (_payload: CustomerInQueue) => void;
  orderAccepted: (_payload: OrderAccepted) => void;
  orderCompleted: (_payload: OrderCompleted) => void;
  chefChangeStatus: (_payload: ChefChangeStatus) => void;
  dishPreparationStarted: (_payload: DishPreparationStarted) => void;
  dishPreparationCompleted: (_payload: DishPreparationCompleted) => void;
};

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const socket: Socket = io(URL, {
  autoConnect: true,
});

/**
 * Register event listeners for socket.
 * @param handlers Object where keys are event names and values are handler functions.
 */
export const registerSocketHandlers = (handlers: Partial<SocketEventHandlers>) => {
  Object.entries(handlers).forEach(([event, handler]) => {
    if (handler) {
      socket.on(event, handler);
    }
  });
};

/**
 * Unregister event listeners for socket.
 * @param events Array of event names to unregister.
 */
export const unregisterSocketHandlers = (events: (keyof SocketEventHandlers)[]) => {
  events.forEach((event) => {
    socket.off(event);
  });
};

export default socket;
