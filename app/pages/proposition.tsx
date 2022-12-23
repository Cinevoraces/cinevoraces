import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { externalGetRequest, mutationRequestCSR } from '@utils/fetchApi';
import dateFormater from '@utils/dateFormater';
import objectFilter from '@utils/objectFilter';
import tmdbMovieFormater from '@utils/tmdbMovieFormater';
import crewFormater from '@utils/crewFormater';
import { toast } from 'react-hot-toast';
import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import type { Slot, TMDBMovie, TMDBDetailedMovie } from '@custom_types/index';
import type { Episode, MovieBody } from '@custom_types/propositionPage';

import { useAppSelector, useAppDispatch } from '@store/store';
import { user } from 'store/slices/user';

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
  const [episode, setEpisode] = useState({ name: 'Selectionnez un épisode', value: { id: 0, season_id: 0, publishing_date: '' } });
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
    <main>
      <p>Proposition wesh</p>
    </main>
  );
};

export default Proposition;
