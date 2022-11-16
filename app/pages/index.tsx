import React, { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  CheckBox,
  Toggle,
  RadioInput,
  RangeInput,
  DoubleRangeInput,
  TextInput,
  TextArea,
} from '@components/Input';
import PosterComponent from '@components/PostersComponent';
import discordLogo from '@public/icons/discord.svg';
import discordInvite from '@public/discord_invite.png';
import commentsSample from '@public/comments_sample.jpg';
import Metrics from '@components/Metrics';

const Home: NextPage = () => {

  const lastMovies = ['/movie_posters/1.jpg', '/movie_posters/2.jpg', '/movie_posters/3.jpg', '/movie_posters/4.jpg', '/movie_posters/5.jpg', '/movie_posters/6.jpg' ];
  const posterStyles = `rounded-lg w-full h-full object-cover shadow-lg max-w-[250px] 
    fourth-child:hidden fifth-child:hidden sixth-child:hidden
    md:fourth-child:block lg:fifth-child:block xl:sixth-child:block`;
  const h2Style = 'text-2xl font-semibold ';
  const emStyle = 'text-orange-primary font-medium';

  const discordInvitation = 'https://discord.gg/r6tK5PGyE7';

  // To delete later
  const metrics = {
    seasons_count: 3,
    movies_count: 137,
    countries_count: 46,
  };

  return (
    <>
      <section
        id="hero"
        className="pt-16 pb-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold">
          Bienvenue dans votre <span className="text-orange-primary">ciné-club</span> virtuel !
        </h1>
        <h2 className={h2Style}>Chaque semaine, un film à découvrir</h2>
        <div className="flex justify-start gap-4">
          <Button to={'/films'}>Découvrir les films</Button>
          <Button
            to={'/inscription'}
            customStyle={'empty'}>
            {'S\'inscrire'}
          </Button>
        </div>
        <div>
          <h2 className={h2Style}>Les derniers ajouts de la communauté :</h2>
          <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {
              //to be adapted with the fetched datas
              lastMovies.map((imageUrl, i) => (
                <Image
                  src={imageUrl}
                  alt={`${imageUrl} movie poster`}
                  width={200}
                  height={(200 * 9) / 16}
                  key={imageUrl}
                  className={posterStyles}
                />
              ))
            }
          </div>
        </div>
      </section>
      <section
        id="discover"
        className="relative z-10 py-8 flex flex-col
          md:flex-row
          before:absolute before:-z-10 before:inset-y-0 before:-inset-x-[100px] before:w-[5000px] before:bg-medium-gray">
        <h2 className={h2Style + 'md:hidden'}>Chaque lundi, un film !</h2>
        <div className='flex-1 flex justify-center max-w-xl md:justify-start'>
          <PosterComponent number={2} />
        </div>
        <div className='flex flex-col justify-center gap-8 flex-1 md:text-end'>
          <h2 className={h2Style + 'hidden md:block'}>Chaque lundi, un film !</h2>
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
            <br /><br/>
            {'Envie de rejoindre l\'aventure ?'}<br/>
            <Link
              href={'/inscription'}
              className={emStyle}>
              Inscrivez-vous{' '}
            </Link>
            pour partager votre passion pour le cinéma avec nous.
          </p>
          <div className="flex justify-end">
            <Button
              to={'/inscription'}
              customStyle="rounded">
              {'S\'inscrire'}
            </Button>
          </div>
        </div>
      </section>
      <section
        id="share"
        className="py-8 flex flex-col items-center gap-6 md:flex-row">
        <div className='flex-1'>
          <h2 className={h2Style}>Partagez vos avis sur les films proposés</h2>
          <p>
            CinéVoraces est une <span className={emStyle}>proposition communautaire</span>. <br/>
            Pour pleinement en profiter,
            rejoignez la communauté et <span className={emStyle}>intéragissez</span> avec les films. <br />
            <br />
            Ajoutez-les dans votre liste de lecture, likez, notez, commentez : on veut savoir ce que vous en avez pensé !
          </p>
        </div>
        <Image
          src={commentsSample}
          alt="Comments section illustration"
          width={549}
          height={260}
          className="w-full border-4 border-black/20 rounded-2xl flex-1 max-w-md"
        />
      </section>
      <section
        id="discord"
        className="relative z-10 py-8 flex flex-col gap-8 items-center justify-between md:flex-row md:text-end
          before:absolute before:-z-10 before:inset-y-0 before:-inset-x-[100px] before:w-[5000px] before:bg-medium-gray">
        <h2 className={h2Style + 'md:hidden'}>Rejoignez le serveur Discord</h2>
        <Image
          src={discordInvite}
          alt="Discord logo"
          width={1005}
          height={856}
          className="flex-1 max-w-sm rounded-xl"
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
              <Image src={discordLogo} alt='' width={25} height={25}/>
              Rejoindre le Discord
            </Button>
          </div>
        </div>
      </section>
      <Metrics {...metrics} />
    </>
  );
};

export default Home;
