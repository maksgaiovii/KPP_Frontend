import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { ICustomer } from '../../../types/customer';

interface ICustomerState {
  customers: ICustomer[];
}

const initialCustomerState: ICustomerState = {
  customers: [],
};

type CustomerAction =
  | { type: 'ADD_CUSTOMER'; payload: ICustomer }
  | { type: 'REMOVE_CUSTOMER_BY_ID'; payload: string | number }
  | { type: 'CHANGE_CUSTOMER_STATUS'; payload: { id: string | number; status: ICustomer['status'] } }
  | { type: 'UPDATE_CUSTOMER'; payload: ICustomer };

const customerReducer = (state: ICustomerState, action: CustomerAction): ICustomerState => {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, { ...action.payload }],
      };
    case 'REMOVE_CUSTOMER_BY_ID':
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
      };
    case 'CHANGE_CUSTOMER_STATUS':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id == action.payload.id ? { ...customer, status: action.payload.status } : customer,
        ),
      };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers
          .map((customer) => (customer.id == action.payload.id ? { ...action.payload } : customer))
          .reduce<ICustomer[]>((acc, customer) => {
            if (acc.some((c) => c?.id == customer.id)) return acc;
            return [...acc, customer];
          }, []),
      };
    default:
      return state;
  }
};

export const CustomerContext = createContext<{
  state: ICustomerState;
  dispatch: React.Dispatch<CustomerAction>;
}>({
  state: initialCustomerState,
  dispatch: () => null,
});

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(customerReducer, initialCustomerState);

  return <CustomerContext.Provider value={{ state, dispatch }}>{children}</CustomerContext.Provider>;
};

export const useCustomerContext = () => useContext(CustomerContext);
