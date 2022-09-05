import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { addToast } from 'redux/slices/global';

/**
 * Show error in a Toast
 */
export const errorHandle: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 400) {
        api.dispatch(addToast({type: 'error', text: `${action.payload.data.error}`}));
      }}
    return next(action);
  };