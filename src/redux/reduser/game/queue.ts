import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
  state: 'prewiev' | 'playing' | 'finished';
}

export const initialMenuState: MenuState = {
  state: 'prewiev',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    setMenuState(state, action: PayloadAction<MenuState['state']>) {
      state.state = action.payload;
    },
  },
  selectors: {
    selectMenuState: (state: MenuState) => state.state,
  },
});

export const { setMenuState } = menuSlice.actions;
export const { selectMenuState } = menuSlice.selectors;

export default menuSlice.reducer;
