import store from '@store/store';

const logoutUser = () => {
  //Clean browser storage
  window.localStorage.clear();
  window.sessionStorage.clear();
  document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  store.dispatch({ type: 'user/logout' });
};

export default logoutUser;
