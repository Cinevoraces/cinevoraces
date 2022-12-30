import { useEffect } from 'react';
import type { MutableRefObject, Dispatch, SetStateAction } from 'react';
import type { KeyedMutator } from 'swr';
import type { MinimalMovie } from '@custom_types/movies';

/** Hook that checks if a connected user has a pending proposition
 * @param userId number | undefined
 * @param userPendingProposition MinimalMovie[] - Array that contains 1 or 0 movie object
 * @param setUserHasPendingProposition 
 * @param userPendingPropositionMutate KeyedMutator - Toggle a data refresh in case user connects on this page
 */
const useRefreshPendingProposition = (
  userId: number | undefined,
  userPendingProposition: MinimalMovie[],
  setUserHasPendingProposition: Dispatch<SetStateAction<boolean | undefined>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userPendingPropositionMutate: KeyedMutator<any>,
) => {
  useEffect(() => {
    userId && userPendingPropositionMutate();
    (userPendingProposition && userPendingProposition.length > 0) 
      ? setUserHasPendingProposition(true) 
      : setUserHasPendingProposition(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userPendingProposition]);
};

export default useRefreshPendingProposition;
