import Link from 'next/link';
import Poster from '@components/Poster';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useTrail, useSpringRef, animated } from '@react-spring/web';

/** Generates an array of number * poster paths, based on the current day of Year
 * @returns Array of movie posters url
 * @param {String} path to ressources
 * @param {String} extension of image files
 * @param {number} number of posters to display
 */
const generatePosterArray = (path: string, extension: string, number: number) => {
  // TODO: Get posters from API **GET /movies/random-posters/:count** endpoint
  // 15 posters for the static component -> modulo 15 -1
  const now = new Date(), start = new Date(now.getFullYear(), 0, 0).getTime();
  const dayOfYear = Math.floor((now.getTime() - start)/(1000 * 60 * 60 * 24));
  return Array.from(Array(number).keys()).map((n) => `${path + '' + (number + n + dayOfYear)%14 + extension}`);
};

interface PostersComponentProps {
  number: 2 | 3 | 8;
}

/**
 * @returns Component composed of a various number of movie posters
 * @param number number of posters to display
 */
const MultiplePosters = ({ number }: PostersComponentProps) => {
  const { data: posters } = useSWR<{ id: number; french_title: string; poster_url: string }[]>(`/movies/random-posters/${number}`);

  const trail = useTrail(
    posters?.length || 0, {
      config: { mass: 10, tension: 100, friction: 60 },
      // reset: true,
      from: { opacity:0 },
      to: { opacity:100 },
    }
  );

  const posterStyles = 'absolute w-[1/2] rounded-lg object-cover shadow-lg';
  const indivStyles = [
    'left-0 top-0', //Style for 2 - 3 - 8 configurations
    'right-[25%] bottom-0', //Style for 2 - 3 - 8 configurations
    'right-0 bottom-[16%]', //Style for 3 - 8 configurations
    'right-0 top-[5%]',
    'left-[5%] bottom-[5%]',
    'right-[8%] bottom-[12%]',
    'left-[7%] bottom-[26%]',
    'left-[25%] bottom-[13%]',
  ];
  return (
    <ul className="relative w-full aspect-square max-w-md">
      {
        (posters && posters?.length > 0) && 
        trail.map((props, index) => (
          <animated.li style={props} key={index+ '-' + posters[index].french_title}>
            <Link href={`/films/${posters[index].id}`} className={posterStyles + ' ' + indivStyles[index]}>
              <Poster
                src={posters[index].poster_url}
                title={posters[index].french_title}
              />
            </Link>
          </animated.li>
        ))}
    </ul>
  );
};

export default MultiplePosters;
