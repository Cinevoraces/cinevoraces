import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UserProps {
  id?: number;
  pseudo?: string;
  role?: string;
  avatar_url?: string;
}
interface UserState extends UserProps{
  isConnected: boolean;
}

const initialState: UserState = {
  isConnected: false,
};

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
    }
  },
});

export const user = (state: RootState) => state.user;
export const {
  login,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
