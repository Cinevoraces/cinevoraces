import type { NextPage } from 'next';
import Button from '@components/Inputs/Buttons';

const Home: NextPage = () => {
  return (
    <main>
      <h1 className='text-3xl font-bold text-orange-primary'>Bonjour et bienvenue chez Cinévoraces !</h1>
      <Button 
        href={'https://nextjs.org/docs/api-reference/next/link'}
      >
        Lien vers la documentation
      </Button>
    </main>
  );
};

export default Home;
