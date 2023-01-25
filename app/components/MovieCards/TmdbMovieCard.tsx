import cutText from '@utils/cutText';
import Poster from '@components/Poster';
import type { TMDBMovie } from 'models/custom_types/index';

interface TmdbMovieCardProps {
  resultCardStyle: string;
  posterStyle: string;
  movie: TMDBMovie;
}

const TmdbMovieCard = ({ resultCardStyle, movie }: TmdbMovieCardProps) => {
  return (
    <div
      id="tmdb-result-card"
      className={resultCardStyle}>
      <Poster 
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : '/movie_posters/placeholder.jpg'
        }
        title={movie.title}
        type='card'/>
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

export default TmdbMovieCard;
