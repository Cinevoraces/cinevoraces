import CustomHead from '@components/Head';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { User } from 'models/custom_types/index';
import Loader from '@components/Loader';
import UserMetrics from 'pages_chunks/user/UI/UserMetrics';
import UserCard from '@components/UserCard';
import { getRequestSSR } from 'binders';

import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface UserProps {
  user: User;
}

const User = ({ user }: UserProps) => {
  // Retrieve asked member id
  const router = useRouter();
  if (router.isFallback) {
    return (
      <main className="custom-container">
        <Loader />
      </main>
    );
  }

  return (
    <>
      <CustomHead
        title={`Cinévoraces - Profil de ${user.pseudo}`}
        description={`Découvrez le profil de ${user.pseudo}.`}
        slug={router.asPath}
        imageUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${user.id}`}
      />
      <main className="grow flex flex-col justify-start">
        <h1 className="custom-container grow-0 pb-4 hero-text text-center">
          {`Profil de ${user?.pseudo}`}
        </h1>
        <section
          id="public_section"
          className="custom-container grow-0">
          <UserCard user={user} type={router.asPath.includes('moi') ? 'personal' : undefined}/>
          <UserMetrics {...user} />
        </section>
      </main>
    </>
  );
};

export default User;

export const getStaticPaths: ()=>Promise<{ paths: { params: {} }[]; fallback: boolean | string } | []> = async () => {
  try {
    const users = await getRequestSSR('/users');
    const paths = users.map((user: User) => ({ params: { user: user.pseudo } }));
    console.log(paths);
    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<Params> = async (context) => {
  const { user: userPseudo } = context.params!;
  try {
    const results: User[] = await getRequestSSR(`/users?select[metrics]=true&where[pseudo]=${userPseudo}`);
    const user = results[0];
    return {
      props: {
        user,
        revalidate: 60,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
