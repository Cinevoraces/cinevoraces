import type { MovieWithPresentation } from '@custom_types/index';
import MoviePicker from '@components/MoviePicker';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@components/Input';
import { AdminActions } from 'enums';

interface PropositionsSectionProps {
  propositions?: MovieWithPresentation[];
  error?: Error;
  handleConfirmationModal: (action: AdminActions, id: number)=>void;
}

const pickMovieStyles = {
  titleStyle: 'custom-container items-start py-4 title-section',
  gridStyle: 'custom-container py-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  resultCardStyle: `w-full flex flex-between peer 
    border border-transparent rounded-xl overflow-hidden 
    bg-dark-gray cursor-pointer 
    peer-hover:scale-105 peer-focus:scale-105 peer-checked:border-orange-primary 
    ease-out duration-300`,
  posterStyle: 'rounded-lg object-cover h-full shadow-lg max-w-[125px]',
  radioStyle: `radio-input absolute z-20 cursor-pointer 
    peer w-[356px] h-[180px] border-none 
    bg-transparent text-transparent 
    checked:bg-none 
    focus:border-transparent focus:ring-none focus:ring-offset-0 focus:ring-transparent 
    hover:border-orange-primary hover:ring-none 
    `,
};

const PropositionsSection = ({ propositions, error, handleConfirmationModal }: PropositionsSectionProps) => {
  // Proposition Selection logic
  const [selectedPropositionId, setSelectedPropositionId] = useState(0);
  const handleSelectProposition = (e: FormEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setSelectedPropositionId(Number(e.target.value));
    }
  };
  // Actions logic
  const handleMoviePublishingConfirmation = () => handleConfirmationModal(AdminActions.PUBLISHMOVIE, selectedPropositionId);
  const handleMovieDeletionConfirmation = () => handleConfirmationModal(AdminActions.DELETEMOVIE, selectedPropositionId);

  return (
    <section>
      <h2 className="custom-container items-start py-4 title-section">Propositions</h2>
      {error ? (
        <div className="bg-medium-gray">
          <div className="custom-container">
            <p>{error.message}</p>
          </div>
        </div>
      ) : (
        propositions && (
          <>
            <MoviePicker
              movies={propositions}
              handleSelectMovie={handleSelectProposition}
              styles={pickMovieStyles}
            />
            <div className='w-full flex gap-4 justify-center mt-4'>
              <Button onClick={handleMoviePublishingConfirmation}>Publier</Button>
              <Button onClick={handleMovieDeletionConfirmation} customStyle='empty'>Supprimer</Button>
            </div>
          </>
        )
      )}
    </section>
  );
};
export default PropositionsSection;
