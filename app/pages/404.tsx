import type { NextPage } from 'next';
import CustomHead from '@components/Head';
import { ErrorSvg } from '@components/SvgComponents';
import { useRouter } from 'next/router';
import { Button } from '@components/Input';
import PostersComponent from '@components/MultiplePosters';

const Custom404: NextPage = () => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <>
      <CustomHead
        title="Cinévoraces - Erreur"
        description="Le contenu demandé n'est pas disponible."
        slug="/erreur"
      />
      <main className="custom-container flex flex-col lg:flex-row">
        <div className='w-full flex flex-col items-center gap-16'>
          <h1 className='hero-text'>Erreur 404</h1>
          <p>{'L\'adresse '}<span className='emphasis'>https://cinevoraces{path}</span>{' n\'a rien donné.'}</p>
          <ErrorSvg style='w-40 h-40 md:w-64 mdh-64 animate-bounce'/>
          <div className='relative z-10 w-fit h-fit before:absolute before:-z-10 before:inset-x-[40px] before:inset-y-[5px] before:bg-orange-primary/30 before:rounded-xl before:animate-ping'>
            <Button to={'/'}>
              {'Retourner à l\'accueil'}
            </Button>
          </div>
        </div>
        <PostersComponent number={3}/>
      </main>
    </>
  );
};

export default Custom404;
