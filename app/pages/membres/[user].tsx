import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '@custom_types/index';
import { useAppSelector } from '@store/store';
import { user } from 'store/slices/user';

import UserMetrics from 'pages_chunks/user/UI/UserMetrics';
import UserCard from 'pages_chunks/user/UI/UserCard';

const User: NextPage = () => {
  // Retrieve asked member id
  const router = useRouter();
  const userId = router.asPath.split('/')[2];
  // Getting public datas and store them in local state
  const addProposition = '&select[proposition]=true';
  // Next initialise the slug with generic [user], prevent unnecessary fetching and downstream errors
  const { data: userData, error } = useSWR(() => (userId !== '[user]') ? '/users?select[metrics]=true&select[propositions]=true&where[id]=' + userId : '');
  const [askedUser, setAskedUser] = useState<User|undefined>(undefined);
  useEffect(() => {
    if (userData && userData.length > 0) {
      console.log(userData);
      setAskedUser(userData[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userData]);
  const connectedUserId = useAppSelector(user).id;
  return (
    <main className='custom-container'>
      <h1 className='w-full hero-text text-center'>
        {
          (connectedUserId && Number(connectedUserId) === askedUser?.id ) 
            ? 'Mon profil public' 
            : 'Profil'}
      </h1>
      {
        (!userData && !error) &&
        <Loader/>
      }
      {
        (askedUser !== undefined) &&
        <>
          <UserCard {...askedUser}/>
          <UserMetrics {...askedUser}/>
        </>
      }
    </main>
  );
};

export default User;
