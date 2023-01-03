import { forwardRef } from 'react';
import MoviePicker from '@components/MoviePicker';
import type { FormEventHandler } from 'react';
import type { TMDBMovie } from '@custom_types/index';

interface PickMovieProps {
  movies: TMDBMovie[];
  handleSelectMovie: FormEventHandler<HTMLFieldSetElement>;
  styles: {[key: string]: string };
}

const PickMovie = forwardRef<HTMLInputElement, PickMovieProps>(({ movies, handleSelectMovie, styles: globalStyles }, ref) => {
  PickMovie.displayName = 'PickMovie';
  const { titleStyle, ...styles } = globalStyles;
  const pickerProps = { movies, handleSelectMovie, styles };
  const searchRef = ref as React.RefObject<HTMLInputElement>;
  return (
    <section>
      <h2 className={titleStyle}>3 - Selectionnez votre film :</h2>
      {ref && searchRef.current?.value && (
        <div className="flex-row py-0">
          {movies.length > 0 ? (
            <p className="mb-4">
              <span className="emphasis">{movies.length}</span>
              {' résultats avec la recherche "'}
              <span className="emphasis">{searchRef.current?.value}</span>
              {'" :'}
            </p>
          ) : (
            <p>
              Aucun résultat pour la recherche <span className="emphasis">{searchRef.current?.value}</span>
            </p>
          )}
        </div>
      )}
      <MoviePicker {...pickerProps}/>
    </section>
  );
});

export default PickMovie;
