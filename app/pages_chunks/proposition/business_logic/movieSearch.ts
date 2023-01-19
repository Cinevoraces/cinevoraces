import { externalGetRequest } from 'binders';
import type { RefObject, SetStateAction, Dispatch } from 'react';
import type { TMDBMovie } from 'models/custom_types/tmdbMovie';

const movieSearch = async (
  searchRef: RefObject<HTMLInputElement>,
  setSearchResults: Dispatch<SetStateAction<TMDBMovie[]>>
) => {
  const data = await externalGetRequest(
    'https://api.themoviedb.org/3',
    '/search/movie',
    process.env.NEXT_PUBLIC_TMDB_KEY || '',
    `language=fr-FR&include_adult=false&query=${searchRef.current?.value}`
  );
  // Remove results that have no poster and no release date
  data.results && setSearchResults(data.results.filter((m: TMDBMovie) => m.release_date && m.poster_path));
};

export { movieSearch };
