import CustomHead from '@components/Head';
import { useAppSelector } from '@store/store';
import { PickEpisode, PickMovie, SearchMovie, WritePresentationAndSend } from 'pages_chunks/proposition/UI';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { user } from 'store/slices/user';
import useSWR from 'swr';

import type { EpisodeOption, TMDBMovie } from 'models/custom_types/index';
import type { NextPage } from 'next';
import type { FormEvent, RefObject } from 'react';

import Loader from '@components/Loader';
import tryCatchWrapper from '@utils/tryCatchWrapper';
import { useRouter } from 'next/router';
import { movieSearch } from 'pages_chunks/proposition/business_logic/movieSearch';
import propositionSubmit from 'pages_chunks/proposition/business_logic/propositionSubmit';
import useFormatEpisodeOptions from 'pages_chunks/proposition/business_logic/useFormatEpisodeOptions';
import useRefreshPendingProposition from 'pages_chunks/proposition/business_logic/useRefreshPendingProposition';

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
  const [userHasPendingPropositions, setUserHasPendingPropositions] = useState<boolean | undefined>(undefined);
  // if user manages to login / logout / change on this very page
  const {
    data: userData,
    error: userError,
    mutate: userMutate,
  } = useSWR(() => (userId ? `/users?select[propositions]=true&where[id]=${userId}` : null));
  useRefreshPendingProposition(userId, userData, setUserHasPendingPropositions, userMutate);

  // Episode logic
  const [areOptionsDisplayed, setAreOptionsDisplayed] = useState(false);
  const [episode, setEpisode] = useState<EpisodeOption>({
    name: 'Date - Épisode...',
    value: '0',
  });
  const { data: episodes } = useSWR(() => (userId ? '/episodes' : ''));
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
  const submitSuccess = async (
    selectedMovieId: number,
    episode: EpisodeOption,
    presentation: RefObject<HTMLTextAreaElement>
  ) => {
    const response = await propositionSubmit(selectedMovieId, episode, presentation);
    toast.success(response.message);
    userMutate();
    router.push('/');
    return userMutate();
  };
  const handlePropositionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)(selectedMovieId, episode, presentation);
  };
  return (
    <>
      <CustomHead
        title="Cinévoraces - Proposer un film"
        description="Un film à faire découvrir ? C'est par ici !"
        slug={router.asPath}
      />
      <main className="justify-start min-h-[81vh]">
        <h1 className="custom-container pb-4 hero-text items-start">Proposer un film</h1>
        {!userId ? (
          <p className="custom-container"> Vous devez être connecté•e pour proposer un film.</p>
        ) : !user && !userError ? (
          <Loader />
        ) : userHasPendingPropositions ? (
          <p className="custom-container">
            Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre
            proposition publiée.
          </p>
        ) : !episodes?.length ? (
          <p className="custom-container">
            Tous les épisodes des semaines à venir sont réservés. Réessayez dans quelques semaines !
          </p>
        ) : (
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
              movies={searchResults}
              handleSelectMovie={handleSelectMovie}
              ref={searchRef}
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
        )}
      </main>
    </>
  );
};

export default Proposition;
