import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '@custom_types/index';
import { useAppSelector } from '@store/store';
import { user } from 'store/slices/user';
import { Button } from '@components/Input';

import UserMetrics from 'pages_chunks/user/UI/UserMetrics';
import UserCard from 'pages_chunks/user/UI/UserCard';
import useRefreshUserData from 'pages_chunks/user/business_logic/useRefreshUserData';

const User: NextPage = () => {
  const connectedUserId = useAppSelector(user).id?.toString();
  // Retrieve asked member id
  const router = useRouter();
  const slug = router.asPath.split('/')[2];
  // Handling public / private page layout
  const isPrivatePage = (slug === 'moi');
  const userId = !(isPrivatePage) ? slug : connectedUserId?.toString();
  // Getting public datas and store them in local state
  const addProposition = (isPrivatePage) ? '&select[propositions]=true' : '';
  // Next initializes the slug with a generic [user] string, this prevents unnecessary fetches and downstream errors
  const { data: userData, error, mutate } = useSWR(
    () => (userId && userId !== '[user]') 
      ? `/users?select[metrics]=true${addProposition}&where[id]=${userId}` 
      : '');
  const [askedUser, setAskedUser] = useState<User|undefined>(undefined);
  useRefreshUserData(userId, connectedUserId, userData, mutate, setAskedUser);
  
  return (
    <main className='grow flex flex-col justify-start'>
      <h1 className='custom-container grow-0 pb-4 hero-text text-center'>
        {
          (isPrivatePage)
            ? 'Mon profil privé'
            : (connectedUserId && Number(connectedUserId) === askedUser?.id ) 
              ? 'Mon profil public' 
              : 'Profil'}
      </h1>
      {
        //Asked for private page without being logged
        (isPrivatePage && !connectedUserId)
          ? <p>Vous devez vous connecter pour accèder à cette page.</p>
        // Loading status
          : (!userData && !error) 
            ? <Loader/>
          // Fetching data failed
            : (error)
              ? <p>Une erreur est survenue, veuillez réessayer plus tard?</p>
            // Fetched data
              : (askedUser) && (
                <>
                  <section id='public_section' className='custom-container grow-0'>
                    <UserCard {...askedUser}/>
                    <UserMetrics {...askedUser}/>
                  </section>
                  {
                    isPrivatePage &&
                    <section id='private_section' className='flex flex-col gap-6'>
                      <div id='pending_proposition' className=''>
                        <h2 className='custom-container grow-0 py-4 title-section'>Proposition en attente</h2>
                        <div className='w-full px-4 py-3 text-center bg-medium-gray'>
                          {
                            (askedUser && askedUser.propositions && askedUser.propositions.length > 0)
                              ? <p>1 proposition en attente !!</p>
                              : (
                                <div className='flex flex-col items-center gap-4'>
                                  <p className='w-full'>
                                    <span className='emphasis'>{'Vous n\'avez pas de proposition en attente.'}</span><br/> 
                                    {'Une idée ? C\'est par ici :'}
                                  </p>
                                  <Button to='/proposition'>Proposer un film</Button>
                                </div>
                              )
                          }
                        </div>
                      </div>
                      <div className='custom-container grow-0 py-4'>
                        <h2 className='title-section'>Changer mes paramètres</h2>
                      </div>
                    </section>
                  }
                </>
              )
      }
    </main>
  );
};

export default User;
