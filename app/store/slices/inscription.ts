import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface inscriptionStateInterface {
  isRequired: boolean;
  isPWVisible: boolean;
}

const initialState: inscriptionStateInterface = {
  isRequired: false,
  isPWVisible: false,
};

const inscriptionSlice = createSlice({
  name: 'inscription',
  initialState,
  reducers: {
    toggleIsRequired(state) {
      state.isRequired = !state.isRequired;
    },
    toggleIsPWVisible(state) {
      state.isPWVisible = !state.isPWVisible;
    },
  },
});

export const inscription = (state: RootState) => state.inscription;
export const {
  toggleIsRequired,
  toggleIsPWVisible,
} = inscriptionSlice.actions;
export default inscriptionSlice.reducer;
