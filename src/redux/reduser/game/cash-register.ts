import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICashRegister } from '../../../types/cash-register';

export interface ICashState {
  cashRegisters: ICashRegister[];
}

export const initialCashState: ICashState = {
  cashRegisters: [],
};

const cashSlice = createSlice({
  name: 'cash',
  initialState: initialCashState,
  reducers: {
    addCashRegister(state, action: PayloadAction<ICashRegister>) {
      if (!state.cashRegisters.find((cashRegister) => cashRegister.id === action.payload.id))
        state.cashRegisters.push(JSON.parse(JSON.stringify(action.payload)));
    },
    removeCashRegisterById(state, action: PayloadAction<string | number>) {
      state.cashRegisters = state.cashRegisters.filter((cashRegister) => cashRegister.id !== action.payload);
    },
    updateCashRegister(state, action: PayloadAction<ICashRegister>) {
      const cashRegisterIndex = state.cashRegisters.findIndex((cashRegister) => cashRegister.id === action.payload.id);
      if (cashRegisterIndex !== -1) {
        state.cashRegisters[cashRegisterIndex] = JSON.parse(JSON.stringify(action.payload));
      }
    },
  },
  selectors: {
    getCashRegisterById: (state: ICashState, id: string | number) =>
      state.cashRegisters.find((cashRegister) => cashRegister.id === id),
    getCashRegisters: (state: ICashState) => state.cashRegisters,
  },
});

export const { addCashRegister, removeCashRegisterById, updateCashRegister } = cashSlice.actions;
export const { getCashRegisterById, getCashRegisters } = cashSlice.selectors;
export default cashSlice.reducer;
