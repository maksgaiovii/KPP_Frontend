import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
  amountOfCashRegisters: string;
  amountOfCooks: string;
  cookingStrategy: string;
}

export const initialSettingState: SettingState = {
  amountOfCashRegisters: '1',
  amountOfCooks: '1',
  cookingStrategy: '1:1',
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
});

export const { setAmountOfCashRegisters, setAmountOfCooks, setCookingStrategy } = settingSlice.actions;

export default settingSlice.reducer;
