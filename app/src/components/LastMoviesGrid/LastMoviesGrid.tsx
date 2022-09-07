import { useGetAllMoviesQuery } from 'redux/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from 'components/Inputs/InputsLib';
import Loader from 'components/Loader/Loader';
import styles from './LastMoviesGrid.module.scss';

const transition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.2,
  delay: 0.2
}; 
const variants = {
  hidden: {opacity: 0, transition},
  show:   {opacity: 1, transition},
};

/**
 * @return grid with the last 5 movies posted
 */
function LastMoviesGrid() {
  const {data: movies, isLoading} = useGetAllMoviesQuery('');
  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = '1';
  };
  return(
    <>
      {!isLoading && movies &&
        <motion.div id='last-movie' className={styles['last-movies']} variants={variants} initial='hidden' animate='show'>
          <h2 className={styles.title}>Les derniers ajouts de la communauté</h2>
          <div className={styles.grid}>
            {/* Map only last 5 movies */}
            {[...movies].slice(0,5).map(({poster_url, id}) => 
              <div className={styles.poster} key={id}>
                <Link to={`/film/${id}`}>
                  <img onLoad={onLoad} src={poster_url} className={styles.img} alt={''}/>
                </Link>
              </div>)}
          </div>
          <Button to='/films' styleMod='fill-rounded'>
            Voir la liste des films
          </Button>
        </motion.div>}
      {isLoading &&
        <div id='last-movie' className={styles.loader}>
          <Loader />
        </div>}
    </>
  );
}

export default LastMoviesGrid;