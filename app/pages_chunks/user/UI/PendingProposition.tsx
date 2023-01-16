import React from 'react';
import { PropositionMovieCard } from '@components/MovieCards';
import { Button } from '@components/Input';
import type { MovieWithPresentation } from 'models/custom_types/index';

interface PendingPropositionProps {
  propositions?: MovieWithPresentation[];
}

// Temporary styles, adapted for one and only proposition at a time
const propositionStyles = {
  titleStyle: 'custom-container pt-4 title-section',
  resultCardStyle: `w-[356px] flex flex-between 
    border border-transparent rounded-xl overflow-hidden 
    bg-dark-gray`,
  posterStyle: 'rounded-lg object-cover h-full shadow-lg max-w-[125px]',
};

const PendingProposition = ({ propositions }: PendingPropositionProps) => {
  return (
    <div id="pending_proposition">
      <h2 className={propositionStyles.titleStyle}>Proposition en attente</h2>
      <div className="w-full px-4 py-3 flex justify-center bg-medium-gray">
        {propositions && propositions.length > 0 ? (
          propositions.map((m) => (
            <PropositionMovieCard
              key={m.french_title}
              propositionCardStyle={propositionStyles.resultCardStyle}
              posterStyle={propositionStyles.posterStyle}
              movie={m}
            />
          ))
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
