import { configureStore } from '@reduxjs/toolkit';
import chefReduser from './reduser/game/chefs';
import customerReduser from './reduser/game/customers';
import menuReduser from './reduser/menu';
import settingReduser from './reduser/setting';

const store = configureStore({
  reducer: {
    setting: settingReduser,
    menu: menuReduser,
    customers: customerReduser,
    chefs: chefReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
