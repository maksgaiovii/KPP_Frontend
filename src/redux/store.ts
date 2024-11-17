import { configureStore } from '@reduxjs/toolkit';
import menuReduser from './reduser/menu';
import settingReduser from './reduser/setting';

const store = configureStore({
  reducer: {
    setting: settingReduser,
    menu: menuReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
