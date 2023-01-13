import { useEffect } from 'react';
import { useAppDispatch } from '@store/store';
import { setUserModification } from '@store/slices/user';
import { getStateFromSessionStorage } from '@utils/sessionStorageOperations';

const useRecoverStateFromSessionStorage = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(setUserModification(getStateFromSessionStorage('user')));
  }, [dispatch]);
};

export default useRecoverStateFromSessionStorage;
