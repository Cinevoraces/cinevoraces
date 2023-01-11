import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Roles } from '@custom_types/global';

export interface UserProps {
  id?: number;
  pseudo?: string;
  role?: Roles;
  avatar_url?: string;
}

const initialState: UserProps = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(_, action) {
      const user = action.payload;
      return { 
        isConnected: true,
        ...user
      };
    },
    logout(){
      return initialState;
    },
    setUserModification(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
  },
});

export const user = (state: RootState) => state.user;
export const {
  login,
  logout,
  setUserModification,
} = userSlice.actions;
export default userSlice.reducer;
