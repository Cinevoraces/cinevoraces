import Poster from '@components/Poster';
import { animated, useSpringRef, useTrail } from '@react-spring/web';
import type { CompleteMovie } from 'models/custom_types/index';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface MovieGridProps {
  error?: Error;
  moviesResults: CompleteMovie[];
  isFilterMenuOpen: boolean;
}
const gridStyle = `w-full grid gap-4 grid-cols-2 
  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
  `;

const MoviesGrid = ({ error, moviesResults, isFilterMenuOpen }: MovieGridProps) => {
  // Animation Section
  const previousMoviesResultsLength = useRef<number>(0);
  const api = useSpringRef();
  const trail = useTrail(moviesResults.length, {
    ref: api,
    config: { mass: 1, tension: 300, friction: 36 },
    reset: !isFilterMenuOpen && previousMoviesResultsLength.current > moviesResults.length,
    from: { opacity: 0, y: 25 },
    to: { opacity: 100, y: 0 },
  });

  useEffect(() => {
    previousMoviesResultsLength.current = moviesResults.length;
    if (isFilterMenuOpen) api.stop();
    api.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesResults, isFilterMenuOpen]);

  return (
    <section
      id="movie-grid"
      className="w-full">
      {error && <p>Une erreur est survenue.</p>}
      {!moviesResults && !error && <p>Chargement des données.</p>}
      {moviesResults && (
        <div className="w-full flex flex-col gap-3 font-medium">
          <p className="text-xl font-semibold mb-4">
            {moviesResults.length > 0 ? moviesResults.length + ' films trouvés' : 'Aucun résultat...'}
          </p>
          <ul className={gridStyle}>
            {trail.map((props, index) => (
              <animated.li
                style={props}
                className="relative"
                key={moviesResults[index].french_title}>
                <Link href={`/films/${moviesResults[index].id}`}>
                  <Poster
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/poster/${moviesResults[index].id}`}
                    title={moviesResults[index].french_title}
                    type="grid"
                  />
                </Link>
              </animated.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
export default MoviesGrid;
