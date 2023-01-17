import type { NextPage } from 'next';
import CustomHead from '@components/Head';
import { InscriptionForm } from '@components/Forms';
import PosterComponent from '@components/MultiplePosters';
import Metrics from '@components/Metrics';
import type { MetricsProps } from '@components/Metrics';
import { getDataFromEndpointSSR } from 'binders/fetchApi';

interface InscriptonProps {
  metrics: MetricsProps;
}

const Inscription: NextPage<InscriptonProps> = ({ metrics }) => {
  return (
    <>
      <CustomHead
        title="Cinévoraces - Inscription"
        description="Devenez membre de la communauté Cinévoraces."
        slug="/inscription"
      />
      <main className='container mx-auto px-4'>
        <div className='container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-between gap-8 md:flex-row-reverse '>
          <section className='w-full px-auto md:max-w-1/2 xl:mr-[10vh]'>
            <h1 className="text-3xl mb-10 font-bold lg:text-6xl">Créer un compte</h1>
            <InscriptionForm />
          </section>
          <section className='w-full flex justify-center mt-10 md:mt-0 md:max-w-1/2 md:justify-start xl:ml-[10vh]'>
            <PosterComponent number={3} />
          </section>
        </div>
        <Metrics {...metrics}/>
      </main>
    </>
  );
};

export default Inscription;

export async function getServerSideProps() {
  try {
    const metrics = await getDataFromEndpointSSR('/metrics');
    return {
      props: {
        metrics,
      },
    };
  } catch (err){
    console.error(err);
  }
}
