import React from 'react';
import { PropositionMovieCard } from '@components/MovieCards';
import { Button } from '@components/Input';
import type { User } from '@custom_types/index';

interface PendingPropositionProps {
  askedUser: User;
}

const PendingProposition = ({ askedUser }: PendingPropositionProps) => {
  return (
    <div id="pending_proposition">
      <h2 className="custom-container grow-0 py-4 title-section">Proposition en attente</h2>
      <div className="w-full px-4 py-3 flex justify-center bg-medium-gray">
        {askedUser && askedUser.propositions && askedUser.propositions.length > 0 ? (
          <PropositionMovieCard {...askedUser.propositions[0]}/>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="w-full">
              <span className="emphasis">{'Vous n\'avez pas de proposition en attente.'}</span>
              <br />
              {'Une idée ? C\'est par ici :'}
            </p>
            <Button to="/proposition">Proposer un film</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingProposition;
