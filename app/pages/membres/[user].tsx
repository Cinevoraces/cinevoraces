import CustomHead from '@components/Head';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from 'models/custom_types/index';
import Loader from '@components/Loader';
import UserMetrics from 'pages_chunks/user/UI/UserMetrics';
import UserCard from '@components/UserCard';
import useRefreshUserData from 'pages_chunks/user/business_logic/useRefreshUserData';

const User: NextPage = () => {
  // Retrieve asked member id
  const router = useRouter();
  const slug = router.asPath.split('/')[2];
  const userId = slug;
  // Next initializes the slug with a generic [user] string, this prevents unnecessary fetches and downstream errors
  const { data: userData, error, mutate } = useSWR(
    () => userId && userId !== '[user]' ? `/users?select[metrics]=true&where[id]=${userId}` : ''
  );
  const [askedUser, setAskedUser] = useState<User | undefined>(undefined);
  useRefreshUserData(userId, userData, mutate, setAskedUser);

  return (
    <>
      <CustomHead
        title={`Cinévoraces - Profil de ${askedUser?.pseudo}`}
        description={`Découvrez le profil de ${askedUser?.pseudo}.`}
        slug={router.asPath}
        imageUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${askedUser?.id}`}
      />
      <main className="grow flex flex-col justify-start">
        <h1 className="custom-container grow-0 pb-4 hero-text text-center">
          {`Profil de ${askedUser?.pseudo}`}
        </h1>
        {
        //Asked for private page without being logged
        // Loading status
          !userData && !error ? (
            <Loader />
          ) : // Fetching data failed
            error ? (
              <p className="custom-container grow-0">Une erreur est survenue. Veuillez réessayer plus tard.</p>
            ) : (
              // Fetched data
              askedUser && (
                <>
                  <section
                    id="public_section"
                    className="custom-container grow-0">
                    <UserCard user={askedUser} type={router.asPath.includes('moi') ? 'personal' : undefined}/>
                    <UserMetrics {...askedUser} />
                  </section>
                </>
              )
            )
        }
      </main>
    </>
  );
};

export default User;
