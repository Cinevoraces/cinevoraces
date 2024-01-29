import CustomHead from '@components/Head';
import Loader from '@components/Loader';
import UserCard from '@components/UserCard';
import { useAppSelector } from '@store/store';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ParameterForm from 'pages_chunks/user/UI/ParameterForm';
import PendingProposition from 'pages_chunks/user/UI/PendingProposition';
import UserMetrics from 'pages_chunks/user/UI/UserMetrics';
import { user } from 'store/slices/user';
import useSWR from 'swr';

const Moi: NextPage = () => {
  const userId = useAppSelector(user).id?.toString();
  console.log('userId : ', userId);
  // Retrieve asked member id
  const router = useRouter();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR(() => userId && '/users/me?select[metrics]=true&select[propositions]=true');

  return (
    <>
      <CustomHead
        title="Cinévoraces - Modifier votre profil"
        description="Page d'administration de votre profil"
        slug={router.asPath}
        imageUrl={userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${userId}` : undefined}
      />
      <main className="grow flex flex-col justify-start">
        <h1 className="custom-container grow-0 pb-4 hero-text text-center">{'Mon profil privé'}</h1>
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
            userData[0] && (
              <>
                <section
                  id="public_section"
                  className="custom-container grow-0">
                  <UserCard
                    user={userData[0]}
                    type={router.asPath.includes('moi') ? 'personal' : undefined}
                  />
                  <UserMetrics {...userData[0]} />
                </section>
                <section
                  id="private_section"
                  className="flex flex-col gap-6">
                  <PendingProposition propositions={userData[0].propositions} />
                  <div className="custom-container grow-0 pt-4">
                    <h2 className="title-section">Changer mes paramètres</h2>
                    <ParameterForm
                      mutate={mutate}
                      mail={userData[0].mail}
                    />
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

export default Moi;
