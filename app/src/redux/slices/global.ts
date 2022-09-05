import type { RootState } from 'redux/store';
import { createSlice } from '@reduxjs/toolkit';

type globalState = {
  modalIsOpen: boolean,
  toasts: { 
    type: 'error' | 'warn' | 'success',
    text: string,
    duration?: number,
  }[],
};

const initialState: globalState = { 
  modalIsOpen: false,
  toasts: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
    addToast(state, action) {
      state.toasts.push(action.payload);
    },
    removeToast(state) {
      state.toasts.splice(0, 1);
    }
  }});

export const globals = (state: RootState) => state.global;
export const { 
  toggleModal,
  addToast,
  removeToast
} = globalSlice.actions;
export default globalSlice.reducer;