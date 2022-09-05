import Loader from 'components/Loader/Loader';
import styles from './ProposalMovieGrid.module.scss';

type MovieProps = {
  movie: movieProposal
  movieSetter(id: number): void
}
type MovieGridProps = {
  isFetching: boolean,
  movies: movieProposal[],
  movieSetter(id: number): void
}

function Movie({movie, movieSetter} : MovieProps) {
  const handleOnclick = (e: React.MouseEvent<HTMLDivElement>) => { 
    document.querySelector(`.${styles.selected}`)?.classList.remove(styles.selected);
    e.currentTarget?.classList.add(styles.selected);
    movieSetter(movie.id);
  };
  // Resolve poster
  const poster = (movie.poster_url === 'https://image.tmdb.org/t/p/originalnull')
    ? '/images/missing-cover.svg'
    : `https://image.tmdb.org/t/p/original${movie.poster_url}`;
  // Resolve text content
  const title = `
    ${movie.french_title} 
    (${new Date(movie.release_date).getFullYear() || 'N/C'})`;
  const directors = `
    Réalisateur${movie.directors.length > 1 ? 's' : ''} : 
    ${(movie.directors.length > 0) ?  movie.directors.join(', ') : 'N/C'}`;
  const genres = `
    Genre${movie.movie_genres.length > 0 ? 's' : ''} : 
    ${movie.movie_genres.join(', ')}`;
      
  return (
    <div id={String(movie.id)} onClick={handleOnclick} className={styles.movie}>
      <div className={styles.desc}>
        <div className={styles.title}>{title}</div>
        <div className={styles.directors}>{directors}</div>
        <div className={styles.genres}>{genres}</div>
      </div>
      <div className={styles.poster}>
        <img src={poster} alt={`Poster de ${movie.french_title}`} />
      </div>
    </div>
  );
}

function MovieGrid({movies, isFetching, movieSetter}: MovieGridProps) {
  return (
    <div className={styles.grid}>
      {(isFetching) && <div className={styles.loader}><Loader /></div>}

      {(!isFetching && movies && movies.length > 0) &&
        movies.map((movie)=> (<Movie key={movie.id} movie={movie} movieSetter={movieSetter}/>))}

      {(movies && movies.length <= 0 && !isFetching ) &&
        <div className={styles.empty}>Aucun film trouvé</div>}
    </div>
  );
}

export default MovieGrid;