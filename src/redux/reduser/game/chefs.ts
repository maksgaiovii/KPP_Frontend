import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChef } from '../../../types/chef';

export interface IChefsState {
  chefs: IChef[];
}

export const initialMenuState: IChefsState = {
  chefs: [],
};

const chefSlice = createSlice({
  name: 'chefs',
  initialState: initialMenuState,
  reducers: {
    addChef(state, action: PayloadAction<IChef>) {
      if (!state.chefs.find((chef) => chef.id == action.payload.id))
        state.chefs.push(JSON.parse(JSON.stringify(action.payload)));
    },
    removeChefById(state, action: PayloadAction<string | number>) {
      state.chefs = state.chefs.filter((chef) => chef.id != action.payload);
    },
    changeChefStatus(state, action: PayloadAction<{ id: string | number; status: IChef['status'] }>) {
      const chef = state.chefs.find((chef) => chef.id == action.payload.id);
      if (chef) {
        chef.status = action.payload.status;
      }
    },
    updateChef(state, action: PayloadAction<IChef>) {
      const chefIndex = state.chefs.findIndex((chef) => chef.id == action.payload.id);
      if (chefIndex !== -1) {
        state.chefs[chefIndex] = JSON.parse(JSON.stringify(action.payload));
      }
    },
  },
  selectors: {
    getChefById: (state: IChefsState, id: string | number) => state.chefs.find((chef) => chef.id === id),
    getChefsByStatus: (state: IChefsState, status: IChef['status']) =>
      state.chefs.filter((chef) => chef.status === status),
    getChefsByNear: (state: IChefsState, near: IChef['near']) => state.chefs.filter((chef) => chef.near === near),
    getChefs: (state: IChefsState) => state.chefs,
  },
});

export const { addChef, removeChefById, changeChefStatus, updateChef } = chefSlice.actions;
export const { getChefById, getChefsByStatus, getChefsByNear, getChefs } = chefSlice.selectors;
export default chefSlice.reducer;
