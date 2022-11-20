import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface globalStateInterface {
  isBurgerMenuOpen: boolean;
  isUserMenuOpen: boolean;
  isConnectionModalOpen: boolean;
}

const initialState: globalStateInterface = {
  isBurgerMenuOpen: false,
  isUserMenuOpen: false,
  isConnectionModalOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleBurgerMenu(state) {
      return { ...state, isBurgerMenuOpen: !state.isBurgerMenuOpen };
    },
    toggleUserMenu(state) {
      return { ...state, isUserMenuOpen: !state.isUserMenuOpen };
    },
    toggleConnectionModal(state) {
      return { ...state, isConnectionModalOpen: !state.isConnectionModalOpen };
    },
  },
});

export const globals = (state: RootState) => state.global;
export const {
  toggleBurgerMenu,
  toggleUserMenu,
  toggleConnectionModal,
} = globalSlice.actions;
export default globalSlice.reducer;
