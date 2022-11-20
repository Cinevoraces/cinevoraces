import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface connectionStateInterface {
  isPWVisible: boolean;
}

const initialState: connectionStateInterface = {
  isPWVisible: false,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    toggleIsPWVisible(state) {
      state.isPWVisible = !state.isPWVisible;
    },
  },
});

export const connection = (state: RootState) => state.connection;
export const {
  toggleIsPWVisible,
} = connectionSlice.actions;
export default connectionSlice.reducer;
