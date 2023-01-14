import type { User, CompleteMovie } from '@custom_types/index';
import type { SetStateAction } from 'react';
import { useEffect } from 'react';

const useUpdateNavigationLinks = (
  lastMovie: CompleteMovie[] | undefined,
  setNavLinks: (value: SetStateAction<string[][]>)=>void,
  navLinks: string[][],
  id: number | undefined,
  usersData: User[] | undefined
) => {
  useEffect(
    () => {
      if (lastMovie && lastMovie.length > 0) {
        // First, remove all older/initial links
        setNavLinks([
          ...navLinks.filter((l) => l[0] !== 'Le film de la semaine' && l[0] !== 'Proposer un film'),
          ['Le film de la semaine', `/films/${lastMovie[0].id}`],
        ]);
      }
      // Adding proposition link for connected users that have no pending proposition
      if (
        id &&
        usersData &&
        usersData[0].propositions?.length === 0 &&
        // For some obscure reason, sometimes the removal didn't trigger
        navLinks.filter((l) => l[0] === 'Proposer un film').length === 0
      ) {
        setNavLinks([...navLinks, ['Proposer un film', '/proposition']]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastMovie, id, usersData]
  );
};

export default useUpdateNavigationLinks;
