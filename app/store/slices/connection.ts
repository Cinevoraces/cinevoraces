import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface globalStateInterface {
  isRequired: boolean;
  isPWVisible: boolean;
}

const initialState: globalStateInterface = {
  isRequired: false,
  isPWVisible: false,
};

const globalSlice = createSlice({
  name: 'global',
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

export const connection = (state: RootState) => state.connection;
export const {
  toggleIsRequired,
  toggleIsPWVisible,
} = globalSlice.actions;
export default globalSlice.reducer;
