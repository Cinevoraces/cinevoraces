import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { externalGetRequest, mutationRequestCSR } from '@utils/fetchApi';
import dateFormater from '@utils/dateFormater';
import objectFilter from '@utils/objectFilter';
import tmdbMovieFormater from '@utils/tmdbMovieFormater';
import crewFormater from '@utils/crewFormater';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@store/store';
import { user } from 'store/slices/user';
import { PickEpisode, SearchMovie, PickMovie } from 'pages_components/proposition';

import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import type { Slot, TMDBMovie, TMDBDetailedMovie } from '@custom_types/index';
import type { Episode, MovieBody } from '@custom_types/propositionPage';

// Rendering bug forces to keep these declarations here for no reason and pass it as prop.
const pickMovieStyles = {
  titleStyle : 'custom-container items-start py-4 title-section',
  gridStyle : 'custom-container py-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  resultCardStyle : `w-full flex flex-between peer 
    border border-transparent rounded-xl overflow-hidden 
    bg-dark-gray cursor-pointer 
    peer-hover:scale-105 peer-focus:scale-105 peer-checked:border-orange-primary 
    ease-out duration-300`,
  posterStyle : 'rounded-lg object-cover h-full shadow-lg max-w-[125px]',
  radioStyle : `radio-input absolute z-20 cursor-pointer 
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
  const { data: userPendingProposition, mutate: userPendingPropositionMutate } = useSWR(userId ? `/movies?where[author_id]=${userId}&[is_published]=false` : null);
  const userHasPendingProposition = useRef<boolean>(false);
  // if user manages to login / logout / change on this very page
  useEffect(() => {
    userId && console.log('pending: ', userPendingProposition);
    userId && userPendingPropositionMutate();
    if (userPendingProposition && userPendingProposition.length > 0) userHasPendingProposition.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  // Slot Selection logic
  const [areOptionsDisplayed, setAreOptionsDisplayed] = useState(false);
  const [episode, setEpisode] = useState({ name: 'Date - Épisode...', value: { id: 0, season_id: 0, publishing_date: '' } });
  const { data: availableSlots } = useSWR('/slots?where[is_booked]=false&limit=10');
  const availableSlotsArray = useRef<Episode[]>([]);
  useEffect(() => {
    if (availableSlots) {
      availableSlotsArray.current = availableSlots.map(
        (s: Slot) => (
          { name: `${dateFormater(s.publishing_date)} - S${s.season_number}E${s.episode}`, 
            value: { id: s.id, season_id: s.season_number, publishing_date: s.publishing_date.slice(0, 10) } 
          })
      );
    } 
  }, [availableSlots]);
  const handleOptionsDisplay = () => setAreOptionsDisplayed(!areOptionsDisplayed);

  // Movie Search logic
  const searchRef = useRef<HTMLInputElement>(null);
  const initialResultsState: TMDBMovie[] = [];
  const [ searchResults, setSearchResults ] = useState(initialResultsState);
  const handleMovieSearch = async (e: FormEvent) => {
    e.preventDefault();
    const data = await externalGetRequest('https://api.themoviedb.org/3', 
      '/search/movie',
      process.env.NEXT_PUBLIC_TMDB_KEY || '', 
      `language=fr-FR&include_adult=false&query=${searchRef.current?.value}` );
    // Remove results that have no poster and no release date
    (data.results) && 
    setSearchResults(data.results.filter((m: TMDBMovie) => m.release_date && m.poster_path));
  };
  // Movie Picking logic
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const handleSelectMovie = (e: FormEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setSelectedMovieId(Number(e.target.value));
    }
  };
  // Presentation logic
  const presentation = useRef<HTMLTextAreaElement>(null);
  // Sending proposition to backend logic
  const handlePropositionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Getting complete infos on the selected movie
    const movieDetails = await externalGetRequest('https://api.themoviedb.org/3', 
      `/movie/${selectedMovieId}`,
      process.env.NEXT_PUBLIC_TMDB_KEY || '', 
      'language=fr-FR' );
    // Modeling movie object
    const wantedMovieProperties = ['title', 'original_title', 'poster_path', 'release_date', 'runtime', 'genres', 'spoken_languages', 'production_countries'];
    const filteredMovieDetails = objectFilter(movieDetails, wantedMovieProperties) as TMDBDetailedMovie;
    const shrunkMovieDetails = tmdbMovieFormater(filteredMovieDetails);
    const credits = await externalGetRequest('https://api.themoviedb.org/3', 
      `/movie/${selectedMovieId}/credits`,
      process.env.NEXT_PUBLIC_TMDB_KEY || '', 
      'language=fr-FR' ); 
    const formatedCredits = crewFormater(credits);
    const { value: { season_id, publishing_date } } = episode;
    if (presentation.current){
      const completeMovieObject = { 
        ...shrunkMovieDetails, 
        ...formatedCredits, 
        season_id, publishing_date, 
        presentation: presentation.current.value 
      } as MovieBody;
      // Sending the proposition to backend
      const res = await mutationRequestCSR('POST', '/movies', completeMovieObject);
      console.log('réponse : ', res);
      if (res.message.includes('bien été enregistrée')) { // Regex à valider ------------------------------------
        const bookingRes = await mutationRequestCSR('PUT', `/slots/book/${episode.value.id}`, {});
        console.log(bookingRes);
        // Test on bookingRes.message --------- if ok
        // const bookingResStatusCode = await bookingRes.statusCode;
        // (bookingResStatusCode.match('/20\d/g')) ? toast.success(res.message) : toast.error(bookingRes.message);
      } else {
        return toast.error(res.message);
      }
    }
  };
  return (
    <main className='justify-start min-h-[81vh]'>
      <h1 className="custom-container pb-4 hero-text items-start">Proposer un film</h1>
      {
        (!userId || (userHasPendingProposition && userHasPendingProposition.current)) 
          ? <p className='custom-container'>{
            (!userId) 
              ? 'Vous devez être connecté pour proposer un film.' 
              : 'Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.'
          }</p>
          : (
            <>
              <PickEpisode
                availableSlotsArray={availableSlotsArray.current}
                areOptionsDisplayed={areOptionsDisplayed}
                handleOptionsDisplay={handleOptionsDisplay}
                episode={episode}
                setEpisode={setEpisode}/>
              <SearchMovie 
                handleMovieSearch={handleMovieSearch}
                ref={searchRef}/>
              <PickMovie 
                searchResults={searchResults}
                handleSelectMovie={handleSelectMovie}
                styles={pickMovieStyles}/>
            </>
          )
      }
    </main>
  );
};

export default Proposition;
