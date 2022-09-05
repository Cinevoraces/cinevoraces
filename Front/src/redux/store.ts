import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filterSlice from './slices/filter';
import globalSlice from './slices/global';
import userSlice from './slices/user';
import { api } from './api';
import { apiTmdb } from './apiTmdb';
import { errorHandle } from './middleware/errorHandle';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    filter: filterSlice,
    user: userSlice,
    [api.reducerPath]: api.reducer,
    [apiTmdb.reducerPath]: apiTmdb.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, apiTmdb.middleware, errorHandle)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;