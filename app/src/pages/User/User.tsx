import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetOneUserQuery } from 'redux/api';
import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import UserInfo from './UserInfo';
import UserMetrics from './UserMetrics';
import UserProposal from './UserProposal';
import Footer from 'components/Layout/Footer';
import Loader from 'components/Loader/Loader';
import Error from 'pages/Error/Error';
import styles from './User.module.scss';

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

function User() {
  const {id: pageId}                = useParams();
  const {id: stateId, isOnline}     = useAppSelector(userState);
  const {
    data: userData,
    isLoading, isError, error}      = useGetOneUserQuery(Number(pageId));
  const [isUserPage, setIsUserPage] = useState(false);
  const [role, setRole]             = useState('');
  const [date, setDate]             = useState('');
  const [avatar, setAvatar]         = useState('/images/user_default.svg');
  
  // Resolve if page ID is user ID
  useEffect(() => {
    if (isOnline && Number(pageId) === stateId) {
      setIsUserPage(true);
    } else {
      setIsUserPage(false);
    }}, [pageId, stateId, isOnline]);
  // Resolve user infos
  useEffect(() => {
    if (userData) {
      userData.role === 'user' && setRole('Utilisateur');
      userData.role === 'admin' && setRole('Administrateur');
      userData.avatar_url && setAvatar(userData.avatar_url);
      setDate(
        new Date(userData.created_at)
          .toLocaleDateString(
            'fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}));
    }}, [userData]);

  return(
    <AnimationLayout>
      {userData && pageId &&
      <>
        <motion.main className={styles.user} variants={variants} initial='hidden' animate='show'>
          <h1>{isUserPage ? `Mon compte ${role.toLowerCase()}` : role}</h1>
          <div className={styles.header}>
            <div className={styles.row}>
              <img src={avatar} alt=''/>
              <div className={styles.username}>{userData.pseudo}</div>
            </div>
            <div className={styles.date}>
              Membre depuis le<span>{date}</span>
            </div>
          </div>
          <h2>{isUserPage ? 'Mon récap' : `Récap de ${userData.pseudo}`}&nbsp;en 5 chiffres</h2>
          <UserMetrics id={pageId}/>
          {isUserPage &&
          <>
            <UserProposal id={pageId}/>
            <h2>Mes paramètres</h2>
            <UserInfo/>
          </>}
        </motion.main>
        <Footer/>
      </>}
      {isLoading && <Loader isMaxed/>}
      {isError && 
        <Error error={error}>
          Cet utilisateur n'existe pas dans notre base données.
        </Error>}
    </AnimationLayout>
  );
}

export default User;