import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomer } from '../../../types/customer';

export interface ICustomerState {
  customers: ICustomer[];
}

export const initialMenuState: ICustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customers',
  initialState: initialMenuState,
  reducers: {
    addCustomer(state, action: PayloadAction<ICustomer>) {
      state.customers.push(JSON.parse(JSON.stringify(action.payload)));
    },
    removeCustomerById(state, action: PayloadAction<string | number>) {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
    },
    changeCustomerStatus(state, action: PayloadAction<{ id: string | number; status: ICustomer['status'] }>) {
      const customer = state.customers.find((customer) => customer.id === action.payload.id);
      if (customer) {
        customer.status = action.payload.status;
      }
    },
    updateCustomer(state, action: PayloadAction<ICustomer>) {
      const customerIndex = state.customers.findIndex((customer) => customer.id === action.payload.id);
      if (customerIndex !== -1) {
        state.customers[customerIndex] = JSON.parse(JSON.stringify(action.payload));
      }
    },
  },
  selectors: {
    getCustomerById: (state: ICustomerState, id: string | number) =>
      state.customers.find((customer) => customer.id === id),
    getCustomersByStatus: (state: ICustomerState, status: ICustomer['status']) =>
      state.customers.filter((customer) => customer.status === status),
    getCustomers: (state: ICustomerState) => state.customers,
  },
});

export const { addCustomer, removeCustomerById, changeCustomerStatus, updateCustomer } = customerSlice.actions;
export const { getCustomerById, getCustomersByStatus, getCustomers } = customerSlice.selectors;
export default customerSlice.reducer;
