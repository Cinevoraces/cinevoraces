import { useEffect } from 'react';
import { useAppDispatch } from '@store/store';
import { setUserModification } from '@store/slices/user';
import { getStateFromSessionStorage } from '@utils/sessionStorageOperations';

/**
 * Custom hook which purpose is to retrieve user state from sessionStorage when user hard refreshes
 */
const useRecoverStateFromSessionStorage = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(setUserModification(getStateFromSessionStorage('user')));
  }, [dispatch]);
};

export default useRecoverStateFromSessionStorage;
