import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
  amountOfCashRegisters: string;
  amountOfCooks: string;
  cookingStrategy: string;
}

export const initialMenuState: MenuState = {
  amountOfCashRegisters: '1',
  amountOfCooks: '1',
  cookingStrategy: '1:1',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    setAmountOfCashRegisters(state, action: PayloadAction<string>) {
      state.amountOfCashRegisters = action.payload;
    },
    setAmountOfCooks(state, action: PayloadAction<string>) {
      state.amountOfCooks = action.payload;
    },
    setCookingStrategy(state, action: PayloadAction<string>) {
      state.cookingStrategy = action.payload;
    },
  },
});

export const { setAmountOfCashRegisters, setAmountOfCooks, setCookingStrategy } = menuSlice.actions;

export default menuSlice.reducer;
