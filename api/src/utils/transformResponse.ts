import type { rawMovie } from '@src/types/Movies';
import objectHandler from './objectHandler';

export default {
  oneMovie: (rawMovie: rawMovie) => {
    return handleMovieObject(rawMovie);
  },
  manyMovies: (rawMovies: rawMovie[]) => {
    return rawMovies.map((rawMovie) => {
      return handleMovieObject(rawMovie);
    });
  }
};

const handleMovieObject = (rawMovie: rawMovie) => {
  const { movie_has_country, movie_has_genre, movie_has_language } = rawMovie;
  delete rawMovie['movie_has_country'];
  delete rawMovie['movie_has_genre'];
  delete rawMovie['movie_has_language'];
  return {
    ...rawMovie,
    countries: objectHandler.nestedValuesToArray(movie_has_country, 'country', 'name'),
    genres: objectHandler.nestedValuesToArray(movie_has_genre, 'genre', 'name'),
    languages: objectHandler.nestedValuesToArray(movie_has_language, 'language', 'name'),
  };
};
