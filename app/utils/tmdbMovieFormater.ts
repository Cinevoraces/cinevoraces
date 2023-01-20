import type { TMDBDetailedMovie } from 'models/custom_types/index';

const detailledMovieShrunker = (detailledMovie: TMDBDetailedMovie) => {
  return Object.keys(detailledMovie)
    .reduce((shrunkObject: {[key: string]: number | string | string[] } | undefined, property: string) => {
      if (['genres', 'spoken_languages', 'production_countries'].includes(property) && shrunkObject){
        if (property === 'genres') shrunkObject.movie_genres = detailledMovie[property].map((g) => g.name);
        if (property === 'spoken_languages') shrunkObject.movie_languages = detailledMovie[property].map((l) => l.name);
        if (property === 'production_countries') shrunkObject.movie_countries = detailledMovie[property].map((c) => c.name);
        return shrunkObject;
      };
      if (property === 'poster_path') {
        return {
          ...shrunkObject, 
          poster_url: `https://image.tmdb.org/t/p/original${detailledMovie.poster_path}`,
        };
      };
      if (property === 'title') {
        return {
          ...shrunkObject, 
          french_title: detailledMovie.title,
        };
      };
      return { ...shrunkObject, [property]: detailledMovie[property] };
    }, {});
};

export default detailledMovieShrunker;
