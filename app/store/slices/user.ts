import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Roles } from 'models/enums';

// For no reason, directly import the env variable when calling the state doesn't work properly.
const imagesSource = (process.env.NEXT_PUBLIC_API_BASE_URL_SSR);

export interface UserProps {
  id?: number;
  pseudo?: string;
  role?: Roles;
  avatarUrl?: string;
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
        ...user,
        avatarUrl: `${imagesSource}/public/avatar/${user.id}`,
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
