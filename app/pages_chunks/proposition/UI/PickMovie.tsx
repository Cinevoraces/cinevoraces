import { forwardRef } from 'react';
import MovieCard from '@components/MovieCard';
import type { FormEventHandler } from 'react';
import type { TMDBMovie } from '@custom_types/index';

interface PickMovieProps {
  searchResults: TMDBMovie[];
  handleSelectMovie: FormEventHandler<HTMLFieldSetElement>;
  styles: {[key: string]: string };
}

const PickMovie = forwardRef<HTMLInputElement, PickMovieProps>(({ searchResults, handleSelectMovie, styles }, ref) => {
  PickMovie.displayName = 'PickMovie';
  const { posterStyle, radioStyle, resultCardStyle, gridStyle, titleStyle } = styles;
  const searchRef = ref as React.RefObject<HTMLInputElement>;
  return (
    <section>
      <h2 className={titleStyle}>3 - Selectionnez votre film :</h2>
      {ref && searchRef.current?.value && (
        <div className="flex-row py-0">
          {searchResults.length > 0 ? (
            <p className="mb-4">
              <span className="emphasis">{searchResults.length}</span>
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
      <div className="w-full bg-medium-gray">
        <fieldset
          onChange={handleSelectMovie}
          className={gridStyle}>
          {
            // Easy enhancement => occupy the empty space with a loader custom or a placeholder card
            searchResults.length > 0 ? (
              searchResults.map((m) => (
                <label
                  key={m.id}
                  htmlFor="select-movie"
                  className="relative">
                  <input
                    type="radio"
                    value={m.id}
                    name="select-movie"
                    className={radioStyle}
                  />
                  <MovieCard
                    resultCardStyle={resultCardStyle}
                    posterStyle={posterStyle}
                    movie={m}
                  />
                </label>
              ))
            ) : (
              <MovieCard
                resultCardStyle={resultCardStyle}
                posterStyle={posterStyle}
                movie={{
                  title: 'Ma recommandation',
                  original_title: 'Ma recommandation',
                  poster_path: '',
                  release_date: new Date().getFullYear().toString(),
                  overview: 'Ne faites pas attention à moi. J\'attends juste que vous lanciez une recherche.',
                }}
              />
            )
          }
        </fieldset>
      </div>
    </section>
  );
});

export default PickMovie;
