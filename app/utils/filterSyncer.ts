import type { CompleteMovie } from 'models/custom_types/index';

const arrayCategoryAggregate = (movies: CompleteMovie [], category: 'genres' | 'countries') => {
  const filtersArray = movies.reduce(
    (acc: string[], movie: CompleteMovie) => {
      return [
        ...acc, 
        ...movie[category].filter((f: string) => !acc.includes(f)),
      ];
    }, []);
  return filtersArray.sort((f1, f2) => (f1 > f2) ? 1 : (f2 > f1) ? -1 : 0);
};

const releaseDateAggregate = (movies: CompleteMovie []) => {
  const releaseDateArray = movies.reduce(
    (acc: string[], movie: CompleteMovie) => {
      return [
        ...acc, 
        (!acc.includes(movie.release_date)) ? movie.release_date : '',
      ];
    }, []);
  const releaseYearArray = releaseDateArray.map((d: string) => Number(d.slice(0, 4)));
  return [Math.min(...releaseYearArray).toString(), Math.max(...releaseYearArray).toString()];
};

const runtimeAggregate = (movies: CompleteMovie []) => {
  const runtimeArray = movies
    .reduce(
      (acc: number[], movie: CompleteMovie) => {
        return [
          ...acc, 
          (!acc.includes(movie.runtime)) ? movie.runtime : NaN,
        ];
      }, [])
    .filter((r) => r); // extract the NaN due to duplicate values
  return [Math.min(...runtimeArray).toString(), Math.max(...runtimeArray).toString()];
};

const filtersSync = (movies: CompleteMovie []) => {
  return {
    genres: arrayCategoryAggregate(movies, 'genres'),
    countries: arrayCategoryAggregate(movies, 'countries'),
    runtime: runtimeAggregate(movies),
    releaseYear: releaseDateAggregate(movies),
  };
};

export default filtersSync;
