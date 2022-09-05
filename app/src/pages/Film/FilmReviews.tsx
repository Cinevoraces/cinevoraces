import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { useGetAllReviewsQuery } from 'redux/api';
import { usePostInteractionMutation, usePutInteractionMutation } from 'redux/api';
import { Button, InputStar } from 'components/Inputs/InputsLib';
import { addToast } from 'redux/slices/global';
import useSeeMore from 'hooks/useSeeMore';
import styles from './FilmReviews.module.scss';
import Avatar from 'components/Avatar/Avatar';
import Loader from 'components/Loader/Loader';

type ReviewProps = {
  avatar: string,
  username: string,
  date: string,
  comment: string,
  note: number,
  edit?(): void
}
type AddReviewProps = {
  userId: number,
  movieId: string,
  setIsEdit(): void
  review?: {
    text: string,
    date: string,
  }}
type FilmReviewsProps = {
  movieId: string,
  userId: number | undefined
}

function FilmReviews({userId, movieId}: FilmReviewsProps) {
  const {data: reviewsData} = useGetAllReviewsQuery(movieId);
  const [isEdit, setIsEdit] = useState(false);
  const [isPost, setIsPost]  = useState(false);
  const [userReview, setUserReview] = useState<DBReview[]>([]);
  const [reviews, setReviews] = useState<DBReview[]>([]);
  // Handlers
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleIsPost = () => {
    setIsPost(!isPost);
  };
  // Reviews resolver
  useEffect(() => {
    reviewsData && userId && setUserReview(
      reviewsData.filter(({user_id}) => user_id === userId));
    reviewsData && setReviews(
      reviewsData.filter(({user_id}) => user_id !== userId));
  }, [reviewsData, userId]);

  return(
    <section className={styles.reviews}>
      {reviewsData &&
        <>
          <h3>Commentaires ({reviewsData.length})</h3>
          {/* Return user post review if no review yet */}
          {userId && (userReview.length === 0) &&
            <>
              {!isPost &&
              <div className={styles['button-wrapper']}>
                <Button handler={handleIsPost}>Ajouter un commentaire</Button>
              </div>}
              {isPost && 
                <AddReview 
                  userId={userId}
                  movieId={movieId}
                  setIsEdit={handleIsPost}/>}
            </>}
          {/* Return user editable review if exist */}
          {userId && userReview &&
            userReview.map(({avatar_url, user_pseudo, created_at, comment, rating}) => (
              <>
                {isEdit && 
                  <AddReview 
                    userId={userId}
                    movieId={movieId}
                    review={{text: comment, date: created_at}}
                    setIsEdit={handleIsEdit}/>}
                {!isEdit && 
                  <Review 
                    edit={handleIsEdit}
                    avatar={avatar_url}
                    username={user_pseudo}
                    date={created_at}
                    comment={comment}
                    note={rating}/>}
              </>))}
          {/* Return other reviews if exist */}
          {reviews.map(({avatar_url, user_pseudo, created_at, comment, rating}) => (
            <Review 
              avatar={avatar_url}
              username={user_pseudo}
              date={created_at}
              comment={comment}
              note={rating}/>))}
        </>}
      {!reviewsData &&
        <>
          <p className={styles.empty}>
            Aucun commentaire pour ce film
          </p>
          {userId &&
            <>
              {!isPost &&
              <div className={styles['button-wrapper']}>
                <Button handler={handleIsPost}>Ajouter un commentaire</Button>
              </div>}
              {isPost && 
                <AddReview 
                  userId={userId}
                  movieId={movieId}
                  setIsEdit={handleIsPost}/>}
            </>}  
        </>}
    </section>
  );
};

function Review({edit, avatar, username, date, comment, note}: ReviewProps) {
  const sliceText = useSeeMore(comment);

  return(
    <div className={styles.comment}>
      {(edit) && <Button handler={edit} styleMod='rounded-fill'>Editer</Button>}
      <Avatar img={avatar} asInfo={{username: username, date: date}}/>
      <div className={styles.note}><InputStar value={note}/></div>
      {sliceText}
    </div>
  );
}

function AddReview({userId, movieId, review, setIsEdit}: AddReviewProps) {
  const dispatch          = useAppDispatch();
  const {avatar, pseudo}  = useAppSelector(userState);
  const [postInteraction] = usePostInteractionMutation();
  const [putInteraction, {isLoading}]  = usePutInteractionMutation();

  // FIXME: Issue #5
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = e.currentTarget.comment.value;
    !review && await postInteraction({userId: userId, movieId: movieId});
    await putInteraction({userId: userId, movieId: movieId, body: {comment: comment}});
    dispatch(addToast({type: 'success', text: 'Commentaire posté!'}));
    setIsEdit();
  };
  const handleCancel = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsEdit();
  };
  
  return (
    <>
      <div className={styles['post-review']}>
        <Avatar 
          img={avatar}
          asInfo={{username: pseudo, date: review ? review.date : new Date().toString()}}
        />
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            {isLoading && 
            <div className={styles['wrapper-loader']}>
              <Loader/>
            </div>}
            <label>
              <textarea name='comment' defaultValue={review ? review.text : ''} placeholder='Ajouter un commentaire' className={styles.textarea} />
            </label>
            <div className={styles.submit}>
              <Button styleMod='fill-rounded'>
                <img src='/images/send-icon.svg' alt=''/> Poster
              </Button>
              <Button handler={handleCancel} styleMod='fill-rounded'>Annuler</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilmReviews;