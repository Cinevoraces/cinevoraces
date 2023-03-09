import CustomHead from '@components/Head';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from 'models/custom_types/index';
import { useAppSelector } from '@store/store';
import { user } from 'store/slices/user';
import Loader from '@components/Loader';
import ParameterForm from 'pages_chunks/user/UI/ParameterForm';
import UserMetrics from 'pages_chunks/user/UI/UserMetrics';
import UserCard from '@components/UserCard';
import useRefreshUserData from 'pages_chunks/user/business_logic/useRefreshUserData';
import PendingProposition from 'pages_chunks/user/UI/PendingProposition';

const User: NextPage = () => {
  const userId = useAppSelector(user).id?.toString();
  // Retrieve asked member id
  const router = useRouter();
  // Next initializes the slug with a generic [user] string, this prevents unnecessary fetches and downstream errors
  // const { data: userData, error, mutate } = useSWR(
  //   () => userId && userId !== '[user]' ? '/users/me?select[metrics]=true&select[propositions]=true' : ''
  // );
  const { data: userData, error, mutate } = useSWR(
    () => userId && userId !== '[user]' ? '/users/me' : ''
  );
  const [askedUser, setAskedUser] = useState<User | undefined>(undefined);
  useRefreshUserData(userId, userData, mutate, setAskedUser, userId);

  return (
    <>
      <CustomHead
        title='Cinévoraces - Modifier votre profil'
        description="Page d'administration de votre profil"
        slug={router.asPath}
        imageUrl={askedUser?.id ? `${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${askedUser?.id}` : undefined}
      />
      <main className="grow flex flex-col justify-start">
        <h1 className="custom-container grow-0 pb-4 hero-text text-center">
          {'Mon profil privé'}
        </h1>
        {
        //Asked for private page without being logged
          !userId ? (
            <p className="custom-container grow-0">Vous devez vous connecter pour accèder à cette page.</p>
          ) : // Loading status
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
                    <section
                      id="private_section"
                      className="flex flex-col gap-6">
                      <PendingProposition propositions={askedUser.propositions}/>
                      <div className="custom-container grow-0 pt-4">
                        <h2 className="title-section">Changer mes paramètres</h2>
                        <ParameterForm mutate={mutate} mail={askedUser.mail}/>
                      </div>
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
