import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { globalSliceReducer, userSliceReducer, filteredMovies } from './slices';
import { saveToLocalStorage } from '@utils/localStorageOperations';
import { logoutMiddleware } from './middlewares';
import type { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
  reducer: {
    global: globalSliceReducer,
    user: userSliceReducer,
    filteredMovies: filteredMovies,
  },
  middleware: [logoutMiddleware],
});

store.subscribe(() => saveToLocalStorage('user', store.getState().user));

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
