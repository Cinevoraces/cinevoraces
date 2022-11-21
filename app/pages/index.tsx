import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@components/Input';
import PosterComponent from '@components/PostersComponent';
import discordLogo from '@public/icons/discord.svg';
import discordInvite from '@public/discord_invite.png';
import commentsSample from '@public/comments_sample.jpg';
import Metrics from '@components/Metrics';
import type { MetricsProps } from '@components/Metrics';
import type { Movie } from '@custom_types/types';
import { getDataFromEndpointSSR } from '@utils/fetchApi';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';

interface HomeProps {
  metrics: MetricsProps;
  lastSixMovies: Movie[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { metrics, lastSixMovies } = props;
  const isConnected = useAppSelector(user).isConnected;
  const lastSixMoviesInfos = lastSixMovies.map((m) => ({
    id: m.id,
    french_title: m.french_title,
    poster_url: m.poster_url,
  }));

  // Prepared Tailwind Styles
  const sectionStyle = 'even:bg-medium-gray even:md:text-end ';
  const sectionContentStyle =
    'container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-between gap-8 md:flex-row ';
  const posterStyles = `rounded-lg w-full h-full object-cover shadow-lg max-w-[250px] 
    fourth-child:hidden fifth-child:hidden sixth-child:hidden
    md:fourth-child:block lg:fifth-child:block xl:sixth-child:block
    hover:scale-105`;
  const h2Style = 'text-2xl font-semibold lg:text-3xl ';
  const emStyle = 'text-orange-primary font-medium';

  const discordInvitation = 'https://discord.gg/r6tK5PGyE7';

  return (
    <main>
      <section
        id="hero"
        className={sectionStyle}>
        <div className={sectionContentStyle + 'md:flex-col'}>
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-8 flex-1">
              <h1 className="text-4xl font-bold lg:text-6xl">
                Bienvenue dans votre <span className="text-orange-primary">ciné-club</span> virtuel !
              </h1>
              <h2 className={h2Style}>Chaque semaine, un film à découvrir</h2>
              <div className="flex justify-start gap-4">
                <Button to={'/films'}>Découvrir les films</Button>
                {
                  !isConnected &&
                  <Button
                    to={'/inscription'}
                    customStyle={'empty'}>
                    {'S\'inscrire'}
                  </Button>
                }
              </div>
            </div>
            <div className="hidden lg:flex lg:w-full lg:max-w-lg lg:justify-end lg:flex-1">
              <PosterComponent number={8} />
            </div>
          </div>
          <div>
            <h2 className={h2Style}>Les derniers ajouts de la communauté :</h2>
            <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {lastSixMoviesInfos.map((movie) => (
                <Link
                  href={`/films/${movie.french_title}`}
                  className="fourth-child:hidden fifth-child:hidden sixth-child:hidden md:fourth-child:block lg:fifth-child:block xl:sixth-child:block"
                  key={movie.french_title}>
                  <Image
                    src={movie.poster_url}
                    alt={`${movie.french_title} movie poster`}
                    width={200}
                    height={(200 * 9) / 16}
                    className={posterStyles}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="discover"
        className={sectionStyle}>
        <div className={sectionContentStyle}>
          <h2 className={h2Style + ' self-start md:hidden'}>Tous les lundi, un nouveau film !</h2>
          <div className="flex w-full max-w-lg items-center justify-center md:justify-start md:flex-1">
            <PosterComponent number={2} />
          </div>
          <div className="flex flex-col justify-center gap-8 flex-1">
            <h2 className={h2Style + 'hidden md:block'}>Tous les lundi, un nouveau film !</h2>
            <p>
              <span className={emStyle}>Cinévoraces </span>
              <span>
                {
                  'rassemble depuis 2020 des passionnés de tous les cinémas. Comédies, blockbusters d\'action, drames, horreur, thrillers, films d’auteurs... tous les genres sont représentés !'
                }
              </span>
              <br />
              <span>
                {
                  'Sur le même principe qu’un club de lecture, chaque semaine, un membre de la communauté propose un film à visionner. Il est ensuite commenté et noté directement sur la page du film et fait l\'objet de discussions sur '
                }
              </span>
              <Link
                href={'#discord'}
                className={emStyle}>
                notre serveur Discord.
              </Link>
              <br />
              <br />
              {'Envie de rejoindre l\'aventure ?'}
              <br />
              {
                !isConnected ?
                  <Link
                    href={'/inscription'}
                    className={emStyle}>
                    { 'Inscrivez-vous ' }
                  </Link>
                  : <span className={emStyle}>{'Inscrivez-vous '}</span>
              }
              pour partager votre passion pour le cinéma avec nous.
            </p>
            {
              !isConnected &&
              <div className="flex justify-end">
                <Button
                  to={'/inscription'}
                  customStyle="rounded">
                  {'S\'inscrire'}
                </Button>
              </div>
            }
          </div>
        </div>
      </section>
      <section
        id="share"
        className={sectionStyle}>
        <div className={sectionContentStyle}>
          <div className="flex-1">
            <h2 className={h2Style + 'mb-8'}>Partagez vos avis sur les films proposés</h2>
            <p>
              CinéVoraces est une <span className={emStyle}>proposition communautaire</span>. <br />
              Pour pleinement en profiter, rejoignez la communauté et <span className={emStyle}>intéragissez</span> avec
              les films. <br />
              <br />
              Ajoutez-les dans votre liste de lecture, likez, notez, commentez : on veut savoir ce que vous en avez
              pensé !
            </p>
          </div>
          <Image
            src={commentsSample}
            alt="Comments section illustration"
            width={549}
            height={260}
            className="w-full border-4 border-black/20 rounded-2xl flex-1 max-w-md"
          />
        </div>
      </section>
      <section
        id="discord"
        className={sectionStyle}>
        <div className={sectionContentStyle}>
          <h2 className={h2Style + ' self-start md:hidden'}>Rejoignez le serveur Discord</h2>
          <Image
            src={discordInvite}
            alt="Discord logo"
            width={1005}
            height={856}
            className="flex-1 w-5/6 max-w-lg min-w-[300px] rounded-xl"
          />
          <div className="flex flex-col items-center gap-6 md:items-end">
            <h2 className={h2Style + 'mb-8 hidden md:block'}>Rejoignez le serveur Discord</h2>
            <p>
              Vous souhaitez rejoindre la communauté active de Cinévoraces ? <br />
              Participer à des <span className={emStyle}>événements</span> et parler de cinéma et de beaucoup
              {' d\''}
              <span className={emStyle}>autres sujets</span> ?
              <br />
              <br />
              Rejoignez-nous aussi sur Discord !
            </p>
            <div className="self-start md:self-end">
              <Button
                href={discordInvitation}
                customStyle="rounded">
                <Image
                  src={discordLogo}
                  alt=""
                  width={25}
                  height={25}
                />
                Rejoindre le Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Metrics {...metrics} />
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const metrics = await getDataFromEndpointSSR('/metrics');
    const lastSixMovies = await getDataFromEndpointSSR('/movies?where[is_published]=true&limit=6');
    return {
      props: {
        metrics,
        lastSixMovies,
      },
    };
  } catch (err){
    console.error(err);
  }
}

export default Home;
