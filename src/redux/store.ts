import { configureStore } from '@reduxjs/toolkit';
import cashReduser from './reduser/game/cash-register';
import chefReduser from './reduser/game/chefs';
import menuReduser from './reduser/menu';
import settingReduser from './reduser/setting';

const store = configureStore({
  reducer: {
    setting: settingReduser,
    menu: menuReduser,
    chefs: chefReduser,
    cash: cashReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
