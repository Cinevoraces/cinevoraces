import type { RootState } from 'redux/store';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type UserState = { 
  isOnline: boolean,
  id: number | undefined,
  pseudo: string,
  mail: string,
  avatar: string,
  role: string,
  accessToken: string | null | undefined,
  refreshToken: string | null | undefined,
};

const initialState: UserState = { 
  isOnline: false,
  id: undefined,
  pseudo: '',
  mail: '',
  role: '',
  avatar: '',
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isOnline     = true;
      state.id           = action.payload.id;
      state.pseudo       = action.payload.pseudo;
      state.mail         = action.payload.mail;
      state.role         = action.payload.role;
      state.avatar       = action.payload.avatar_url;
      state.accessToken  = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('accessToken',action.payload.accessToken);
      Cookies.set('refreshToken',action.payload.refreshToken);
    },
    logout() {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      return initialState;
    }
  }});

export const userState = (state: RootState) => state.user;
export const {login, logout} = userSlice.actions;
export default userSlice.reducer;