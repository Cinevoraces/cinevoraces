import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import type { User } from 'models/custom_types/index';
import type { KeyedMutator } from 'swr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useRefreshUserData = (
  userId: string | undefined,
  connectedUserId: string | undefined,
  userData: User[],
  mutate: KeyedMutator<unknown>,
  setAskedUser: Dispatch<SetStateAction<User | undefined>>
) => {
  useEffect(() => {
    if (userId && userData && userData.length > 0) {
      mutate();
      setAskedUser(userData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, connectedUserId, userData]);
};

export default useRefreshUserData;
