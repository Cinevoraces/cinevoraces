import { ReactComponent as SearchIco } from './Proposal.ico_search.svg';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { usePostMovieMutation, useGetSlotsQuery, usePutSlotMutation } from 'redux/api';
import { addToast } from 'redux/slices/global';
import { apiTmdb } from 'redux/apiTmdb';
import { userState } from 'redux/slices/user';
import { Button, InputText } from 'components/Inputs/InputsLib';
import Error from 'pages/Error/Error';
import Footer from 'components/Layout/Footer';
import MovieGrid from './ProposalMovieGrid';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Proposal.module.scss';

type SearchBarProps = {
  value: string,
  onChange(e: React.ChangeEvent<HTMLInputElement>): void,
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}
type SelectSlotProps = {
  onChange(e: React.FormEvent<HTMLSelectElement>): void,
  slots: slot[]
}
type AddCommentProps = {
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

function Proposal() {
  const {id, isOnline}     = useAppSelector(userState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedSlot, setSelectedSlot] = useState<{[key: string]: string | number}>();
  const [movie, setMovie]               = useState<proposalBody>();
  const [comment, setComment]           = useState('');
  const [query, setQuery]               = useState('');
  const [sendBook, {isSuccess: isBookHandleSuccess}] = usePutSlotMutation();
  const [sendPost, {isSuccess: isPostMovieSuccess}] = usePostMovieMutation();
  const [searchTrigger, {
    data: tmdbData, 
    isFetching: isDetailsFetching}] = apiTmdb.endpoints.tmbdCustomDetails.useLazyQuery();
  const {
    data: slots, 
    isSuccess: isSlotsSuccess, 
    isError: isSlotsError} = useGetSlotsQuery();

  const handleSlotSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    // Resolve selected slot with SelectElement value
    const slot = slots!.find((slot) => String(slot.episode) === e.currentTarget.value);
    // Update state if slot is defined 
    slot && setSelectedSlot({
      publishing_date: slot.publishing_date,
      season_id: slot.season_number
    });
  };
  const handleMovieSelect = (id: number) => {
    setMovie(tmdbData.find((movie: movieProposal) => movie.id === id));
  };
  const handlePresentation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchTrigger(query, false);
  };
  const handleSubmit = () => {
    if (comment.length <= 1 || !movie || !selectedSlot) {
      return dispatch(addToast({type: 'error', text:'Formulaire invalide'}));
    } else if (
      movie.directors.length < 1
      || movie.movie_genres.length < 1
      || movie.casting.length < 1
      || movie.runtime === 0
      || movie.poster_url === 'https://image.tmdb.org/t/p/originalnull') {
      return dispatch(addToast({type: 'error', text:'Sélection invalide'}));
    } else {
      console.log({
        ...selectedSlot,
        ...movie,
        presentation: comment,
        user_id: id!
      });
      sendPost({
        publishing_date: String(selectedSlot.publishing_date),
        season_id: Number(selectedSlot.season_id),
        french_title: movie.french_title,
        original_title: movie.original_title,
        poster_url: movie.poster_url,
        directors: movie.directors,
        release_date: movie.release_date,
        runtime: movie.runtime,
        casting: movie.casting,
        movie_genres: movie.movie_genres,
        movie_languages: movie.movie_languages,
        movie_countries: movie.movie_countries,
        presentation: comment,
        user_id: id!
      });
    }};

  // Handle post success
  useEffect(() => {
    isPostMovieSuccess && sendBook({
      publishing_date: String(selectedSlot!.publishing_date)
    });
  }, [isPostMovieSuccess]);

  // Handle booking success
  useEffect(() => {  
    if (isPostMovieSuccess && isBookHandleSuccess) {
      dispatch(addToast({type: 'success', text: 'Votre film à bien été enregistré'}));
      setTimeout(()=> {
        navigate('/', {state: {}, replace: true});
      },1000);
    }}, [isPostMovieSuccess, isBookHandleSuccess, slots]);

  return (
    <AnimationLayout>
      {isOnline &&
        <main className={styles.proposal}>
          <h1>Ajouter un film</h1>
          {isSlotsError && 
            <div style={{height: '67.5vh'}}>
              <h2>Aucun créneau n'est disponible, réessayez plus tard.</h2>
            </div>}
          {isSlotsSuccess &&
            <>
              <Notice/>
              <SelectSlot onChange={handleSlotSelect} slots={slots}/>
              <h2>Recherche un film</h2>
              <SearchBar value={query} onChange={handleSearch} onSubmit={handleSearchSubmit}/>
              <MovieGrid movies={tmdbData} isFetching={isDetailsFetching} movieSetter={handleMovieSelect}/>
              <AddComment onChange={handlePresentation}/>
              <div className={styles.button}>
                <Button handler={handleSubmit} styleMod='fill-rounded'>
                  <img src='/images/send-icon.svg' alt=''/> Envoyer
                </Button>
              </div>
            </>}
        </main>}
      {!isOnline && 
        <Error error={{status: 401}}>
          Vous devez vous connecter pour proposer un film à la communautée.
          <div className={styles['error-401']}>
            Pas encore membre ?
            <br /><Link to='/register'>Inscrivez-vous!</Link>
          </div>
        </Error>}
      <Footer/>
    </AnimationLayout>
  );
}

function SelectSlot({onChange, slots}: SelectSlotProps) {
  return(
    <form className={styles['slot-selector']}>
      <label htmlFor='episode'>Sélectionnez un créneaux de visionnage</label>
      <span>Une saison = 1 année, un épisode = 1 semaine</span>
      <select onChange={onChange} name='episode' id='episode'>
        <option value='x'>Aucun épisode</option>
        {slots.map(({id, episode, publishing_date, season_number, is_booked}) => (
          !is_booked && <option value={episode} key={id}>
            Saison {season_number} Épisode {episode} - {publishing_date}
          </option>))}
      </select>
    </form>
  );
};

function AddComment({onChange}: AddCommentProps) {
  return (
    <>
      <h2 className={styles.title}>Motivez votre choix</h2>
      <p className={styles.text}>Décrivez aux utilisiteurs pourquoi vous proposez <span>ce film</span>.</p>
      <textarea onChange={onChange} placeholder='Decrire votre avis sur le film' className={styles.input} name='description' rows={12} maxLength={1200}></textarea>
    </>
  );
}

function SearchBar({value, onChange, onSubmit}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className={styles['search-form']}>
      <InputText 
        name='search' 
        type='text' 
        placeholder='Recherche un film'
        value={value}
        handler={onChange}
      />
      <button><SearchIco/></button>
    </form>
  );
}

function Notice() {
  return(
    <p>
      Afin de permettre à <em>l’ensemble de la communauté d’interagir</em>,
      veillez bien à l’accessibilité du film que vous proposerez
      (disponibilité sur les principales plateformes de streaming, bon référencement sur internet...).
      Mais tâchez tout de même de nous <em>surprendre</em> dans votre sélection!
      Plus un film est <em>accessible</em>, plus il sera regardé.
    </p>
  );
}

export default Proposal;