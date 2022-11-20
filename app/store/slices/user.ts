import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    login(state, action) {
      const user = action.payload;
      return { 
        isConnected: true,
        ...user
      };
    },
    loggout(state){
      state = initialState;
    }
  },
});

export const user = (state: RootState) => state.user;
export const {
  login,
  loggout,
} = userSlice.actions;
export default userSlice.reducer;
