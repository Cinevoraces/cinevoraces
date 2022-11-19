import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface inscriptionStateInterface {
  isPWVisible: boolean;
}

const initialState: inscriptionStateInterface = {
  isPWVisible: false,
};

const inscriptionSlice = createSlice({
  name: 'inscription',
  initialState,
  reducers: {
    toggleIsPWVisible(state) {
      state.isPWVisible = !state.isPWVisible;
    },
  },
});

export const inscription = (state: RootState) => state.inscription;
export const { toggleIsPWVisible } = inscriptionSlice.actions;
export default inscriptionSlice.reducer;
