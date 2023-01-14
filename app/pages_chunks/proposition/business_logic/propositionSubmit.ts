import { externalGetRequest, mutationRequestCSR } from '@utils/fetchApi';
import objectFilter from '@utils/objectFilter';
import creditsFormater from '@utils/crewFormater';
import tmdbMovieFormater from '@utils/tmdbMovieFormater';

import type { TMDBDetailedMovie, EpisodeOption, MovieBody } from '@custom_types/index';
import type { RefObject } from 'react';

const wantedMovieProperties = [
  'title',
  'original_title',
  'poster_path',
  'release_date',
  'runtime',
  'genres',
  'spoken_languages',
  'production_countries',
];

const propositionSubmit = async (
  selectedMovieId: number,
  episode: EpisodeOption,
  presentation: RefObject<HTMLTextAreaElement>
) => {
  // Getting complete infos on the selected movie
  const movieDetails = await externalGetRequest(
    'https://api.themoviedb.org/3',
    `/movie/${selectedMovieId}`,
    process.env.NEXT_PUBLIC_TMDB_KEY || '',
    'language=fr-FR'
  );
  // Modeling movie object
  const filteredMovieDetails = objectFilter(movieDetails, wantedMovieProperties) as TMDBDetailedMovie;
  const shrunkMovieDetails = tmdbMovieFormater(filteredMovieDetails);
  const credits = await externalGetRequest(
    'https://api.themoviedb.org/3',
    `/movie/${selectedMovieId}/credits`,
    process.env.NEXT_PUBLIC_TMDB_KEY || '',
    'language=fr-FR'
  );
  const formatedCredits = creditsFormater(credits);
  const { value: episode_id } = episode;
  if (presentation.current) {
    const completeMovieObject = {
      french_title: shrunkMovieDetails?.french_title,
      original_title: shrunkMovieDetails?.original_title,
      poster_url: shrunkMovieDetails?.poster_url,
      directors: formatedCredits?.directors,
      release_date: shrunkMovieDetails?.release_date,
      runtime: shrunkMovieDetails?.runtime,
      casting: formatedCredits?.casting,
      presentation: presentation.current.value,
      movie_genres: shrunkMovieDetails?.movie_genres,
      movie_languages: shrunkMovieDetails?.movie_languages,
      movie_countries: shrunkMovieDetails?.movie_countries,
      episode_id,
    };
    // Sending the proposition to backend
    return await mutationRequestCSR('POST', '/movies', completeMovieObject);
  }
};

export default propositionSubmit;
