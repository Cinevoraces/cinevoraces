import { useGetPendingProposalQuery } from 'redux/api';
import { Button } from 'components/Inputs/InputsLib';
import userStyles from './User.module.scss';
import styles from './UserProposal.module.scss';

function UserProposal({id}: {id: string}) {
  const {data: movieData, isLoading} = useGetPendingProposalQuery(id);

  return(
    <div className={styles['user-submitted']}>
      {!isLoading && !movieData &&
        <div className={styles['no-film-submitted']}>
          <p>
            Vous n’avez
            <span>&nbsp;pas de proposition de film en attente</span>
            . Une idée? C’est par ici!
          </p>
          <Button styleMod='fill' to='/proposal'>
            Proposer un film
          </Button>
        </div>}
      {!isLoading && movieData &&
        <div className={styles['pending-proposal']}>
          <h2 className={userStyles['title-h2']}>Ma proposition en <span>attente :</span></h2>
          <div className={styles['film']}>
            <h3 className={`${styles['grid-title']} ${userStyles['title-h3']}`}>
              {movieData.french_title}
              &nbsp;&#40;{movieData.release_date.slice(0,4)}&#41;
            </h3>

            <div className={styles['grid-direc']}>
              <h4 className={userStyles['title-h4']}>
                réalisateur{(movieData.directors.length > 1) && 's'}
              </h4>
              <span>
                {movieData.directors.join(', ')}
              </span>
            </div>

            <div className={styles['grid-genre']}>
              <h4 className={userStyles['title-h4']}>
              genre{(movieData.genres.length > 1) && 's'}
              </h4>
              <span>
                {movieData.genres.join(', ')}
              </span>
            </div>

            <div className={styles['grid-pDate']}>
              <h4 className={userStyles['title-h4']}>
                date de
                <span>&nbsp;publication :</span>
                <span className={styles['publish-date']}>&nbsp;{(movieData.publishing_date).slice(0,10)}</span>
              </h4>
            </div>

            <div className={`${styles['grid-cover']} ${styles['cover']}`}>
              <img src={movieData.poster_url} alt='Affiche du film' />
            </div>
          </div>
          {/* <Button
            styleMod='fill'
          >
            Modifier ma proposition
          </Button> */}
        </div>
      }
    </div>
  );
}

export default UserProposal;