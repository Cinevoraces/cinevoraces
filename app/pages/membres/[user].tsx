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
  const connectedUserId = useAppSelector(user).id?.toString();
  // Retrieve asked member id
  const router = useRouter();
  const slug = router.asPath.split('/')[2];
  // Handling public / private page layout
  const isPrivatePage = slug === 'moi';
  const userId = !isPrivatePage ? slug : connectedUserId?.toString();
  // Getting public datas and store them in local state
  // API issue with select operator that can't be repeted for this specific endpoint ------------------------------------------------
  const addProposition = isPrivatePage ? '&select[propositions]=true' : '';
  // Next initializes the slug with a generic [user] string, this prevents unnecessary fetches and downstream errors
  const { data: userData, error, mutate } = useSWR(
    () => userId && userId !== '[user]' ? `/users?select[metrics]=true${addProposition}&where[id]=${userId}` : ''
  );
  const [askedUser, setAskedUser] = useState<User | undefined>(undefined);
  useRefreshUserData(userId, connectedUserId, userData, mutate, setAskedUser);
  console.log('askedUser', askedUser); // -----------------------------------

  return (
    <>
      <CustomHead
        title={`Cinévoraces - ${isPrivatePage ? 'Mon profil' : `Profil de ${askedUser?.pseudo}`}`}
        description='Découvrez les profils de nos membres.'
        slug={router.asPath}
        imageUrl={askedUser?.id ? `${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${askedUser?.id}` : undefined}
      />
      <main className="grow flex flex-col justify-start">
        <h1 className="custom-container grow-0 pb-4 hero-text text-center">
          {isPrivatePage
            ? 'Mon profil privé'
            : connectedUserId && Number(connectedUserId) === askedUser?.id
              ? 'Mon profil public'
              : `Profil de ${askedUser?.pseudo}`}
        </h1>
        {
        //Asked for private page without being logged
          isPrivatePage && !connectedUserId ? (
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
                    {isPrivatePage && (
                      <section
                        id="private_section"
                        className="flex flex-col gap-6">
                        <PendingProposition propositions={askedUser.propositions}/>
                        <div className="custom-container grow-0 pt-4">
                          <h2 className="title-section">Changer mes paramètres</h2>
                          <ParameterForm mutate={mutate} mail={askedUser.mail}/>
                        </div>
                      </section>
                    )}
                  </>
                )
              )
        }
      </main>
    </>
  );
};

export default User;
