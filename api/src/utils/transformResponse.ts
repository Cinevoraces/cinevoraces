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
  const { movie_has_country, movie_has_genre, movie_has_language, review } = rawMovie;
  delete rawMovie['movie_has_country'];
  delete rawMovie['movie_has_genre'];
  delete rawMovie['movie_has_language'];
  let user_review = {};
  if (review && review[0]) {
    const { bookmarked, liked, viewed, rating, comment } = review[0];
    delete rawMovie['review'];
    user_review = {
      user_review: { bookmarked, liked, viewed, rating, comment }
    };
  }
  return {
    ...rawMovie,
    ...user_review,
    countries: objectHandler.nestedValuesToArray(movie_has_country, 'country', 'name'),
    genres: objectHandler.nestedValuesToArray(movie_has_genre, 'genre', 'name'),
    languages: objectHandler.nestedValuesToArray(movie_has_language, 'language', 'name'),
  };
};
