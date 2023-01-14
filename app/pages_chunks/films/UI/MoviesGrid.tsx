import type { CompleteMovie } from '@custom_types/index';
import { useTrail, useSpringRef, animated } from '@react-spring/web';
import Link from 'next/link';
import Poster from '@components/Poster';
import { useEffect } from 'react';

interface MovieGridProps{
  error?: Error;
  moviesResults: CompleteMovie[]
  isFilterMenuOpen: boolean;
}
const gridStyle = `w-full grid gap-4 grid-cols-2 
  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
  `;

const MoviesGrid = ({ error, moviesResults, isFilterMenuOpen }: MovieGridProps) => {
  // Animation Section
  const api = useSpringRef();
  const trail = useTrail(
    moviesResults.length, {
      ref: api,
      config: { mass: 1, tension: 300, friction: 36 },
      // reset: true,
      from: { opacity:0, y:25 },
      to: { opacity:100, y:0 }
    }
  );
  useEffect(() => {
    api.start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesResults]);

  return (
    <section id="movie-grid" className='w-full'>
      {error && <p>Une erreur est survenue.</p>}
      {!moviesResults && !error && <p>Chargement des données.</p>}
      {moviesResults && (
        <div className="w-full flex flex-col gap-3 font-medium">
          <p className="">{moviesResults.length + ' films'}</p>
          <ul className={gridStyle}>
            {
              trail.map((props, index) => (
                <animated.li style={props} className='relative' key={index}>
                  <Link href={`/films/${moviesResults[index].id}`}>
                    <Poster
                      src={moviesResults[index].poster_url}
                      title={moviesResults[index].french_title}
                      type='grid'/>
                  </Link>
                </animated.li>))
            }
          </ul>
        </div>
      )}
    </section>
  );
};
export default MoviesGrid;
