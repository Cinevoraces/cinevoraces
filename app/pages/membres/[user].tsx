import { useEffect } from 'react';
import Loader from '@components/Loader';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const User: NextPage = () => {
  const router = useRouter();
  const userId = router.asPath.split('/')[2];
  const addProposition = '&select[proposition]=true';
  console.log('/users?select[metrics]&where[id]=' + userId);
  const { data, error } = useSWR(() => (userId !== '[user]') ? '/users?select[metrics]&where[id]=' + userId : '');
  useEffect(() => {
    console.log(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <main className='custom-container'>
      <h1 className='hero-text'>Profil</h1>
      {
        (!data && !error) &&
        <Loader/>
      }
      {
        data &&
        <div id='user-card' 
          className='flex flex-col gap-2 rounded-xl bg-medium-gray'>
          <div>
          </div>
        </div>
      }
    </main>
  );
};

export default User;
