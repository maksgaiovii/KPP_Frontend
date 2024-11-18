import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
  amountOfCashRegisters: string;
  amountOfCooks: string;
  cookingStrategy: string;
}

export const initialSettingState: SettingState = {
  amountOfCashRegisters: '6',
  amountOfCooks: '4',
  cookingStrategy: 'm:m',
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialSettingState,
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
  selectors: {
    selectAmountOfCashRegisters: (state: SettingState) => state.amountOfCashRegisters,
    selectAmountOfCooks: (state: SettingState) => state.amountOfCooks,
    selectCookingStrategy: (state: SettingState) => state.cookingStrategy,
  },
});

export const { setAmountOfCashRegisters, setAmountOfCooks, setCookingStrategy } = settingSlice.actions;
export const { selectAmountOfCashRegisters, selectAmountOfCooks, selectCookingStrategy } = settingSlice.selectors;

export default settingSlice.reducer;
