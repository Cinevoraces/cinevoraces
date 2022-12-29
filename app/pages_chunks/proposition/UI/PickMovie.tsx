import { forwardRef } from 'react';
import Image from 'next/image';
import cutText from '@utils/cutText';
import type { FormEventHandler } from 'react';
import type { TMDBMovie } from '@custom_types/index';

interface PickMovieProps {
  searchResults: TMDBMovie[];
  handleSelectMovie: FormEventHandler<HTMLFieldSetElement>;
  styles: {[key: string]: string }
}

const PickMovie = forwardRef<HTMLInputElement, PickMovieProps>(
  ({ searchResults, handleSelectMovie, styles }, ref) => {
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
              searchResults.length > 1 &&
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
                    <div
                      id="tmdb-result-card"
                      key={m.id}
                      className={resultCardStyle}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                        alt={`${m.title} movie poster`}
                        width={150}
                        height={(150 * 9) / 16}
                        className={posterStyle}
                      />
                      <div className="w-full h-fill px-3 py-1 flex flex-col justify-between gap-1">
                        <div>
                          <p className="text-lg">
                            {m.title}
                            <span className="text-sm font-light">
                              {m.release_date ? ` (${m.release_date.slice(0, 4)})` : ''}
                            </span>
                          </p>
                          <p className="text-sm">
                            {m.overview ? cutText(m.overview, 100) : 'Pas de résumé disponible.'}
                          </p>
                        </div>
                        <p className="text-xs text-orange-primary hover:underline self-end justify-self-end">
                          <a
                            target="_blank"
                            href={`https://www.themoviedb.org/movie/${m.id}`}
                            rel="noreferrer">
                            Lien vers la fiche TMDB
                          </a>
                        </p>
                      </div>
                    </div>
                  </label>
                ))
            }
          </fieldset>
        </div>
      </section>
    );
  }
);

export default PickMovie;
