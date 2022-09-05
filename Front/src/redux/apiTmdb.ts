import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const maxResult = 15;

export const apiTmdb = createApi({
  reducerPath: 'apiTmdb',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TMDB
  }),
  endpoints: (build) => ({
    tmdb: build.query<any, string>({
      query: (query) =>  ({
        url: `/search/movie?api_key=${API_KEY}&language=fr-FR&include_adult=false&query=${query}`, 
        method: 'GET'
      }),
      transformResponse: ({results}) => {
        if (results > maxResult) {
          return results.slice(0, maxResult);
        } else {
          return results;
        }
      }}),
    tmdbDetails: build.query<any, string>({
      query: (movieId) =>  ({
        url: `/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&include_adult=false`, 
        method: 'GET'
      }),
      transformResponse: ({genres}) => genres
    }),
    tmdbCrew: build.query<any, string>({
      query: (movieId) =>  ({
        url: `/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR&include_adult=false`, 
        method: 'GET'
      }),
      transformResponse: ({crew}) => crew
    }),
    tmbdCustomDetails: build.query<any, any>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        if (!_arg) return {data: null};
        const moviesWithDetails:any = [];
        const movies:any = await fetchWithBQ(`/search/movie?api_key=${API_KEY}&language=fr-FR&include_adult=false&query=${_arg}`);
        const results = movies.data;
        for (let movie of (results.results)) {
          let movieDetails:any = await fetchWithBQ(`/movie/${movie.id}?api_key=${API_KEY}&language=fr-FR&include_adult=false`);
          let castAndDirectors:any = await fetchWithBQ(`/movie/${movie.id}/credits?api_key=${API_KEY}&language=fr-FR&include_adult=false`);
          let crew = castAndDirectors.data.crew;
          let cast = castAndDirectors.data.cast;
          const movieGenres = movieDetails.data.genres;
          const productCoutries = movieDetails.data.production_countries;
          const spokenLanguages = movieDetails.data.spoken_languages;
          const directors = [];
          let director: {[key: string]: string | number};
          for (director of crew) {
            if (director.job === 'Director') {
              directors.push(director.name);
            }}
          const casting = [];
          let actor: {name:string};
          for (actor of cast.slice(0,5)){
            casting.push(actor.name);
          }
          const genres = [];
          let genre: {name:string};
          for (genre of movieGenres){
            genres.push(genre.name);
          }
          const countries = [];
          let countrie: {name: string};
          for (countrie of productCoutries) {
            countries.push(countrie.name);
          }
          const languages = [];
          let language: {name: string};
          for (language of spokenLanguages){
            languages.push(language.name);
          }

          const mov= 
          {
            french_title: movie.title,
            original_title: movie.original_title,
            poster_url: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
            directors: directors.slice(0,3),
            release_date: movie.release_date,
            runtime: movieDetails.data.runtime,
            casting,
            movie_genres: genres,
            movie_languages: languages,
            movie_countries: countries,
            id: movieDetails.data.id
          };
          moviesWithDetails.push(mov);
        }
        return {data: moviesWithDetails};
      }
    })
  })
});

export const { 
  useTmdbQuery,
  useTmdbDetailsQuery,
  useTmdbCrewQuery,
  useTmbdCustomDetailsQuery
} = apiTmdb;