// import type { Proposition } from '@custom_types/index';
import MoviePicker from '@components/MoviePicker';
import type { FormEvent } from 'react';
import { useState } from 'react';
import type { SWRResponse } from 'swr';

interface PropositionsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propositions: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: Error;
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

const PropositionsSection = ({ propositions, error }: PropositionsSectionProps) => {
  // Proposition Selection logic
  const [selectedPropositionId, setSelectedPropositionId] = useState(0);
  const handleSelectProposition = (e: FormEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setSelectedPropositionId(Number(e.target.value));
    }
  };
  // const handlePublishMovie = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const res = await propositionSubmit(selectedMovieId);
  //   // Toast feedback, if success mutate the cache and return to homepage
  //   if (res.message.includes('bien été enregistrée')) {
  //     toast.success(res.message);
  //     userPendingPropositionMutate();
  //     return router.push('/');
  //   } else {
  //     return toast.error(res.message);
  //   }
  // };

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
          <MoviePicker
            movies={propositions}
            handleSelectMovie={handleSelectMovie}
            styles={pickMovieStyles}
          />
        )
      )}
    </section>
  );
};
export default PropositionsSection;
