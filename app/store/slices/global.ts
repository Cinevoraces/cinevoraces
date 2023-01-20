import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addRequestMeta } from 'next/dist/server/request-meta';

interface globalStateInterface {
  isBurgerMenuOpen: boolean;
  isUserMenuOpen: boolean;
  isConnectionModalOpen: boolean;
  arePWVisible: boolean;
  isConfirmationModalOpen: boolean;
}

const initialState: globalStateInterface = {
  isBurgerMenuOpen: false,
  isUserMenuOpen: false,
  isConnectionModalOpen: false,
  arePWVisible: false,
  isConfirmationModalOpen: false,
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
    toggleArePWVisible(state) {
      return { ...state, arePWVisible: !state.arePWVisible };
    },
    toggleConfirmationModal(state) {
      return { ...state, isConfirmationModalOpen: !state.isConfirmationModalOpen };
    },
  },
});

export const global = (state: RootState) => state.global;
export const {
  toggleBurgerMenu,
  toggleUserMenu,
  toggleConnectionModal,
  toggleArePWVisible,
  toggleConfirmationModal,
} = globalSlice.actions;
export default globalSlice.reducer;
