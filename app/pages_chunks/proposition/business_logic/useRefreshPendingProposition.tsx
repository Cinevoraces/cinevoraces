import { useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { KeyedMutator } from 'swr';
import type { User } from '@custom_types/index';

/** Hook that checks if a connected user has a pending proposition
 * @param userId number | undefined
 * @param usersData User[] - Array that contains 1 user
 * @param setUserHasPendingPropositions 
 * @param userPendingPropositionMutate KeyedMutator - Toggle a data refresh in case user connects on this page
 */
const useRefreshPendingProposition = (
  userId: number | undefined,
  usersData: User[],
  setUserHasPendingProposition: Dispatch<SetStateAction<boolean | undefined>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userPendingPropositionMutate: KeyedMutator<any>,
) => {
  useEffect(() => {
    userId && userPendingPropositionMutate();
    (usersData && usersData.length > 0 && usersData[0].propositions && usersData[0].propositions.length > 0) 
      ? setUserHasPendingProposition(true) 
      : setUserHasPendingProposition(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, usersData]);
};

export default useRefreshPendingProposition;
