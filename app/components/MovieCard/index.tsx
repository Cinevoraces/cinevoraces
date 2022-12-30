import Image from 'next/image';
import cutText from '@utils/cutText';
import type { TMDBMovie } from '@custom_types/index';

interface MovieCardProps {
  resultCardStyle: string;
  posterStyle: string;
  movie: TMDBMovie;
}

const MovieCard = ({ resultCardStyle, posterStyle, movie }: MovieCardProps) => {
  return (
    <div
      id="tmdb-result-card"
      className={resultCardStyle}>
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : '/movie_posters/placeholder.jpg'
        }
        alt={`${movie.title} movie poster`}
        width={150}
        height={(150 * 9) / 16}
        className={posterStyle}
      />
      <div className="w-full h-fill px-3 py-1 flex flex-col justify-between gap-1">
        <div>
          <p className="text-lg">
            {movie.title}
            <span className="text-sm font-light">
              {movie.release_date ? ` (${movie.release_date.slice(0, 4)})` : ''}
            </span>
          </p>
          <p className="text-sm">{movie.overview ? cutText(movie.overview, 100) : 'Pas de résumé disponible.'}</p>
        </div>
        <p className="text-xs text-orange-primary hover:underline self-end justify-self-end">
          {movie.id && (
            <a
              target="_blank"
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              rel="noreferrer">
              Lien vers la fiche TMDB
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
