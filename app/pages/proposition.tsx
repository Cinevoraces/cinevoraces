import { useState, useRef } from 'react';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@store/store';
import { user } from 'store/slices/user';
import { PickEpisode, SearchMovie, PickMovie, WritePresentationAndSend } from 'pages_chunks/proposition/UI';

import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import type { TMDBMovie, EpisodeOption } from '@custom_types/index';

import useRefreshPendingProposition from 'pages_chunks/proposition/business_logic/useRefreshPendingProposition';
import useFormatEpisodeOptions from 'pages_chunks/proposition/business_logic/useFormatEpisodeOptions';
import { movieSearch } from 'pages_chunks/proposition/business_logic/movieSearch';
import propositionSubmit from 'pages_chunks/proposition/business_logic/propositionSubmit';
import { useRouter } from 'next/router';
import Loader from '@components/Loader';

// Rendering bug forces to keep these declarations here for no reason and pass it as prop.
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

const Proposition: NextPage = () => {
  // User logic and verifications
  const userId = useAppSelector(user).id;
  const {
    data: userPendingProposition,
    error: errorUserPendingProposition,
    mutate: userPendingPropositionMutate,
  } = useSWR(userId ? `/movies?where[author_id]=${userId}&[is_published]=false` : null);
  const [userHasPendingProposition, setUserHasPendingProposition] = useState<boolean | undefined>(undefined);
  // if user manages to login / logout / change on this very page
  useRefreshPendingProposition(
    userId,
    userPendingProposition,
    setUserHasPendingProposition,
    userPendingPropositionMutate,
  );

  // Episode logic
  const [areOptionsDisplayed, setAreOptionsDisplayed] = useState(false);
  const [episode, setEpisode] = useState<EpisodeOption>({
    name: 'Date - Épisode...',
    value: 0,
  });
  const { data: episodes } = useSWR(() => userId ? '/episodes' : '');
  const episodesArray = useRef<EpisodeOption[]>([]);
  useFormatEpisodeOptions(episodes, episodesArray);
  const handleOptionsDisplay = () => setAreOptionsDisplayed(!areOptionsDisplayed);

  // Movie Search logic
  const searchRef = useRef<HTMLInputElement>(null);
  const initialResultsState: TMDBMovie[] = [];
  const [searchResults, setSearchResults] = useState(initialResultsState);
  const handleMovieSearch = async (e: FormEvent) => {
    e.preventDefault();
    movieSearch(searchRef, setSearchResults);
  };
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const handleSelectMovie = (e: FormEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setSelectedMovieId(Number(e.target.value));
    }
  };
  // Presentation logic
  const router = useRouter();
  const presentation = useRef<HTMLTextAreaElement>(null);
  // Sending proposition to backend logic
  const handlePropositionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await propositionSubmit(selectedMovieId, episode, presentation);
    // Toast feedback, if success mutate the cache and return to homepage
    if (res.message.includes('bien été enregistrée')) {
      toast.success(res.message);
      userPendingPropositionMutate();
      return router.push('/');
    } else {
      return toast.error(res.message);
    }
  };
  return (
    <main className="justify-start min-h-[81vh]">
      <h1 className="custom-container pb-4 hero-text items-start">Proposer un film</h1>
      {
        !userId 
          ? (<p className="custom-container"> Vous devez être connecté•e pour proposer un film.</p>)
          : (!userPendingProposition && !errorUserPendingProposition)
            ? <Loader />
            : userHasPendingProposition 
              ? (
                <p className="custom-container">
                  Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition
                  publiée.
                </p>
              ) 
              : (
                <>
                  <PickEpisode
                    episodesArray={episodesArray.current}
                    areOptionsDisplayed={areOptionsDisplayed}
                    handleOptionsDisplay={handleOptionsDisplay}
                    episode={episode}
                    setEpisode={setEpisode}
                  />
                  <SearchMovie
                    handleMovieSearch={handleMovieSearch}
                    ref={searchRef}
                  />
                  <PickMovie
                    searchResults={searchResults}
                    handleSelectMovie={handleSelectMovie}
                    styles={pickMovieStyles}
                  />
                  <WritePresentationAndSend
                    searchResults={searchResults}
                    selectedMovieId={selectedMovieId}
                    handlePropositionSubmit={handlePropositionSubmit}
                    episode={episode}
                    ref={presentation}
                  />
                </>
              )
      }
    </main>
  );
};

export default Proposition;