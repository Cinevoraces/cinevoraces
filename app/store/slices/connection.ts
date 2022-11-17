import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface connectionStateInterface {
  isRequired: boolean;
  isPWVisible: boolean;
}

const initialState: connectionStateInterface = {
  isRequired: false,
  isPWVisible: false,
};

const connectionSlice = createSlice({
  name: 'connection',
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
} = connectionSlice.actions;
export default connectionSlice.reducer;
