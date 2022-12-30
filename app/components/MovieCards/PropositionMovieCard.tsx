import Image from 'next/image';
import cutText from '@utils/cutText';
import type { Proposition } from '@custom_types/index';

interface PropositionMovieCardProps extends Proposition {};

const resultCardStyle = `w-full flex flex-between text-start
border border-transparent rounded-xl overflow-hidden 
bg-dark-gray border-orange-primary`;
const posterStyle = 'rounded-lg object-cover h-full shadow-lg max-w-[125px]';

const PropositionMovieCard = (movie: PropositionMovieCardProps) => {
  return (
    <div
      id="proposition_result_card"
      className={resultCardStyle}>
      <Image
        src={movie.poster_url ? movie.poster_url : '/movie_posters/placeholder.jpg'
        }
        alt={`${movie.french_title} movie poster`}
        width={150}
        height={(150 * 9) / 16}
        className={posterStyle}
      />
      <div className="w-full h-fill px-3 py-1 flex flex-col justify-between gap-1">
        <div className='flex flex-col gap-1'>
          <p className="text-lg">
            {movie.french_title}
            {/* <span className="text-sm font-light">
              {movie.release_date? ` (${movie.release_date.slice(0, 4)})` : ''}
            </span> */}
          </p>
          <p className="text-sm text-start">{movie.presentation ? cutText(movie.presentation, 100) : 'Pas de résumé disponible.'}</p>
        </div>
        <p className="text-xs text-orange-primary self-end justify-self-end">
          {`Publication prévue pour le : ${movie.publishing_date}`}
        </p>
      </div>
    </div>
  );
};

export default PropositionMovieCard;
