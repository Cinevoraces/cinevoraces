import Image from 'next/image';
import cutText from '@utils/cutText';
import type { Proposition } from '@custom_types/index';

interface PropositionMovieCardProps extends Proposition {};

const resultCardStyle = `w-full flex flex-between text-start max-w-lg
border border-transparent rounded-xl overflow-hidden 
bg-dark-gray border-orange-primary`;
const posterStyle = 'rounded-lg object-cover h-full shadow-lg max-w-[125px]';

const PropositionMovieCard = ({ poster_url, french_title, presentation, publishing_date }: PropositionMovieCardProps) => {
  return (
    <div
      id="proposition_result_card"
      className={resultCardStyle}>
      <Image
        src={poster_url ? poster_url : '/movie_posters/placeholder.jpg'
        }
        alt={`${french_title} movie poster`}
        width={150}
        height={(150 * 9) / 16}
        className={posterStyle}
      />
      <div className="w-full h-fill px-3 py-1 flex flex-col justify-between gap-1">
        <div className='flex flex-col gap-1'>
          <p className="text-lg">
            {french_title}
            {/* <span className="text-sm font-light">
              {movie.release_date? ` (${movie.release_date.slice(0, 4)})` : ''}
            </span> */}
          </p>
          <p className="text-sm text-start">{presentation ? cutText(presentation, 100) : 'Pas de résumé disponible.'}</p>
        </div>
        <p className="text-xs text-orange-primary self-end justify-self-end">
          {`Publication prévue pour le : ${publishing_date}`}
        </p>
      </div>
    </div>
  );
};

export default PropositionMovieCard;
