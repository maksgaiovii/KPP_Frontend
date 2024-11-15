import { configureStore } from '@reduxjs/toolkit';
import menuReduser from './reduser/menu';

const store = configureStore({
  reducer: {
    menu: menuReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
