import { useEffect } from 'react';
import { useAppDispatch } from '@store/store';
import { setUserModification } from '@store/slices/user';
import { getStateFromLocalStorage } from '@utils/localStorageOperations';

/**
 * Custom hook which purpose is to retrieve user state from sessionStorage when user hard refreshes
 */
const useRecoverStateFromSessionStorage = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(setUserModification(getStateFromLocalStorage('user')));
  }, [dispatch]);
};

export default useRecoverStateFromSessionStorage;
