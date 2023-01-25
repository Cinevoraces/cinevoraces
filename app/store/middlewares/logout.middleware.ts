import { logout } from '@store/slices/user';
import type { Middleware } from '@reduxjs/toolkit';

const logoutMiddleware: Middleware = store => next => action => {
  try {
    if (action === 'user/logout') {
      store.dispatch(logout());
    }
    next(action);
  } catch (err){
    console.error(err);
  }
};

export default logoutMiddleware;
