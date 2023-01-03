import { TmdbMovieCard, PropositionMovieCard } from '@components/MovieCards/index';
import type { FormEventHandler } from 'react';
import type { TMDBMovie, Proposition } from '@custom_types/index';

interface MoviePickerProps {
  movies: TMDBMovie[] | Proposition [];
  handleSelectMovie: FormEventHandler<HTMLFieldSetElement>;
  styles: {[key: string]: string };
}

const MoviePicker = ({ movies, handleSelectMovie, styles }: MoviePickerProps) => {
  const { posterStyle, radioStyle, resultCardStyle, gridStyle } = styles;
  const instanceofTMDBMovie = (movies: TMDBMovie[] | Proposition []): movies is TMDBMovie[] => {
    return true;
  };

  return (
    <div className="w-full bg-medium-gray">
      <fieldset
        onChange={handleSelectMovie}
        className={gridStyle}>
        {
          // Check the type of movie objects received
          (instanceofTMDBMovie(movies)) 
            // Proposition use case
            ? movies.length > 0 
              ? movies.map((m) => (
                <label
                  key={(m.id)}
                  htmlFor="select-movie"
                  className="relative">
                  <input
                    type="radio"
                    value={m.id}
                    name="select-movie"
                    className={radioStyle}
                  />
                  <TmdbMovieCard 
                    resultCardStyle={resultCardStyle}
                    posterStyle={posterStyle}
                    movie={m}/>
                </label>
              ))
              : (
                <TmdbMovieCard
                  resultCardStyle={resultCardStyle}
                  posterStyle={posterStyle}
                  movie={{
                    title: 'Ma recommandation',
                    original_title: 'Ma recommandation',
                    poster_path: '',
                    release_date: new Date().getFullYear().toString(),
                    overview: 'Ne faites pas attention à moi. J\'attends juste que vous trouviez de vrais films.',
                  }}
                />)
            : movies.length > 0
              ? movies.map((m) => (
                <label
                  key={(m.movie_id)}
                  htmlFor="select-movie"
                  className="relative">
                  <input
                    type="radio"
                    value={m.movie_id}
                    name="select-movie"
                    className={radioStyle}/>
                  <PropositionMovieCard {...m}/>
                </label>
              ))
              : <p>Aucune proposition en attente</p>
        }
      </fieldset>
    </div>
  );
};

export default MoviePicker;
