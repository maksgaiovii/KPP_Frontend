import { configureStore } from '@reduxjs/toolkit';
import settingReduser from './reduser/setting';
import menuReduser from './reduser/menu';

const store = configureStore({
  reducer: {
    setting: settingReduser,
    menu: menuReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
