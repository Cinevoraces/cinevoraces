import Poster from '@components/Poster';
import { animated, useTrail } from '@react-spring/web';
import Link from 'next/link';
import useSWR from 'swr';

interface PostersComponentProps {
  number: 2 | 3 | 8;
}

/**
 * @returns Component composed of a various number of movie posters
 * @param number number of posters to display
 */
const MultiplePosters = ({ number }: PostersComponentProps) => {
  const { data: posters } = useSWR<{ id: number; french_title: string }[]>(`/movies/random-posters/${number}`);

  const trail = useTrail(posters?.length || 0, {
    config: { mass: 10, tension: 100, friction: 60 },
    from: { opacity: 0 },
    to: { opacity: 100 },
  });

  const posterStyles = 'absolute w-[1/2] rounded-lg object-cover shadow-lg hover:z-10';
  const indivStyles = [
    'left-0 top-0', //Style for 2 - 3 - 8 configurations
    'right-0 bottom-0', //Style for 2 - 3 - 8 configurations
    'left-[25%] bottom-[16%]', //Style for 3 - 8 configurations
    'right-0 top-[5%]',
    'left-[5%] bottom-[5%]',
    'right-[8%] bottom-[12%]',
    'left-[7%] bottom-[26%]',
    'left-[25%] bottom-[13%]',
  ];
  return (
    <ul className="relative w-full aspect-square max-w-md">
      {posters &&
        posters?.length > 0 &&
        trail.map((props, index) => (
          <animated.li
            style={props}
            key={index + '-' + posters[index].french_title}>
            <Link
              href={`/films/${posters[index].id}`}
              className={posterStyles + ' ' + indivStyles[index]}>
              <Poster
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/poster/${posters[index].id}`}
                title={posters[index].french_title}
              />
            </Link>
          </animated.li>
        ))}
    </ul>
  );
};

export default MultiplePosters;
