import { useGetOneMovieQuery } from 'redux/api';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import FilmDesc from './FilmDesc';
import FilmReviews from './FilmReviews';
import Footer from 'components/Layout/Footer';
import Loader from 'components/Loader/Loader';
import Error from 'pages/Error/Error';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Film.module.scss';

function Film() {
  const {id: movieId} = useParams();
  const {id: userId}  = useAppSelector(userState);
  const {data: movie, isLoading, isError, error} = useGetOneMovieQuery(movieId!);
  return (
    <AnimationLayout>
      {movie &&
      <>
        <main className={styles.film}>
          <FilmDesc movie={movie} userId={userId}/>
          <FilmReviews movieId={movieId!} userId={userId}/>
        </main>
        <Footer/>
      </>}
      {isLoading && <Loader isMaxed/>}
      {isError && 
        <Error error={error}>
          Ce film n'existe pas dans notre base données.
        </Error>}
    </AnimationLayout>
  );
};

export default Film;