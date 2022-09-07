import { useState, useEffect } from 'react';
import { usePostInteractionMutation,usePutInteractionMutation } from 'redux/api';
import { useGetOneReviewQuery } from 'redux/api';
import { InputStar } from 'components/Inputs/InputsLib';
import useSeeMore from 'hooks/useSeeMore';
import Interaction from 'components/Interaction/Interaction';
import Avatar from 'components/Avatar/Avatar';
import styles from './FilmDesc.module.scss';

interface FilmDescProps {
  movie: DBMovie,
  userId: number | undefined
}
interface InteractionProps extends FilmDescProps {
  data?: DBUserReview
}

function FilmDesc({movie, userId}: FilmDescProps) {
  const {data: interactionsData} = useGetOneReviewQuery({userId: userId!, movieId: movie.id});
  const sliceText = useSeeMore(movie.presentation, 700);
  // Resolve movie infos
  const date = new Date(movie.release_date).getFullYear();
  const movieInfo = [
    {title: 'Réalisateur :', content: movie.directors.join(', '), style: ''},
    {title: 'Genre :', content: movie.genres.join(', '), style: 'elm--orange'},
    {title: 'Pays :', content: movie.countries.join(', '), style: 'elm--orange'},
    {title: 'Durée :', content: `${movie.runtime}min`, style: 'elm--weight'},
  ];

  useEffect(() => {
    console.log(interactionsData);
  }, [interactionsData]);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  return (
    <div className={styles.desc}>
      <div className={styles.wrapper}>
        <Poster src={movie.poster_url} alt={`Affiche du film ${movie.french_title}`}/>

        {/* Wait for data fetch if logged */}
        {userId && interactionsData && 
          <Interactions movie={movie} userId={userId} data={interactionsData}/>}
        {/* Don't wait for data if visitor or no interaction */}
        {(!userId || !interactionsData) && 
          <Interactions movie={movie} userId={userId}/>}

      </div>

      <div className={styles.description}>
        <h1>{movie.french_title}<span>({date})</span></h1>

        <div className={`${styles.element} ${styles['element--flex']}`}>
            Note des membres :
          <span className={styles.star}>
            <InputStar value={Number(movie.avg_rating)}/>
          </span> 
        </div>
          
        {/* Show user note if logged */}
        {userId && interactionsData &&
          <div className={`${styles.element} ${styles['element--flex']}`}>
              Ma note :
            <span className={styles.star}>
              <InputStar value={interactionsData.rating ? Number(interactionsData.rating) : 0}/>
            </span> 
          </div>}

        {movieInfo.map(({title, content, style}) => (
          <div className={styles.element}>
            {title}<span className={`${styles.elm} ${styles[style]}`}>{content}</span>
          </div>))}
        <div className={styles.casting}>
          <span>Casting :</span>
          <ul>
            {movie.casting.map((actor:string, index:number) => 
              <li key={index} className={styles.list}>{actor}</li>)}
          </ul>
        </div>
      </div>

      <div className={styles.presentation}>
        <Avatar img={movie.user_avatar_url} asInfo={{username: movie.user_pseudo, date: movie.publishing_date}} />
        {sliceText}
      </div>
    </div>
  );
};

function Interactions({movie, userId, data}: InteractionProps) {
  const movieId = movie.id;
  const [postInteraction]             = usePostInteractionMutation();
  const [putInteraction, {isLoading}] = usePutInteractionMutation();
  // Resolve user interactions states
  const [state, setState]             = useState<interactionBody>({
    bookmarked: data ? data.bookmarked : false, 
    viewed: data ? data.viewed : false, 
    liked: data ? data.liked : false, 
  });
  const [ratingState, setRatingState] = useState(
    data ? data.rating : false);
  // Resolve if user as reviewed this movie
  const userHasReview = data ? data.created_at : false;

  // Handlers
  // FIXME: Issue #5
  const handleInteractions = async (type: string) => {
    if (userId) { // Check if logged
      const body = {
        ...state,
        [type]: !Object.entries(state).find(
          e => e[0] === type)![1]};
      const ids = {userId: userId!, movieId: movieId};
      !userHasReview && await postInteraction({...ids}); // Create review if none
      await putInteraction({...ids, body: body}); // Send actual review
      setState(body); // Update local state
    }};
  const handleRating = async (n: number) => {
    if (userId) { // Check if logged
      const ids = {userId: userId!, movieId: movieId};
      !userHasReview && await postInteraction({...ids}); // Create review if none
      await putInteraction({...ids, body: {rating: Number(n)}}); // Send actual review
      setRatingState(Number(n)); // Update local state
    }};

  return(
    <div className={styles.interactions}>
      <Interaction
        value={state.bookmarked}
        handler={handleInteractions}
        type='bookmarked'
        count={Number(movie.watchlist_count)}
        loader={isLoading}
      />
      <Interaction
        value={state.viewed}
        handler={handleInteractions}
        type='viewed'
        count={Number(movie.views_count)}
        loader={isLoading}
      />
      <Interaction 
        value={state.liked}
        handler={handleInteractions}
        type='liked'
        count={Number(movie.likes_count)}
        loader={isLoading}
      />
      <Interaction
        value={ratingState}
        handler={handleRating}
        type='starred'
        count={Number(movie.ratings_count)}
        loader={isLoading}
      />
    </div>
  );
}

function Poster ({src, alt}: {[key:string]: string}) {
  return(
    <div className={styles.poster}>
      <img src={src} alt={alt}/>
    </div>
  );
}

export default FilmDesc;