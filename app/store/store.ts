import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { globalSliceReducer, connectionReducer } from './slices';

const store = configureStore({
  reducer: { global: globalSliceReducer, connection: connectionReducer },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

// Hooks to resolve typing issues
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { RootState, AppDispatch };
export { useAppSelector, useAppDispatch };
