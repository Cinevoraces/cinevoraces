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
import PosterComponent from '@components/PosterComponents';

const Home: NextPage = () => {
  const defaultChecked = false;
  const [isRequired, setIsRequired] = useState(false);
  const [isRememberChecked, setIsRememberChecked] = useState(defaultChecked);
  const [value, setValue] = useState(18);
  const [minValue, setMinValue] = useState(18);
  const [maxValue, setMaxValue] = useState(100);
  const [isPwVisible, setIsPwVisible] = useState(false);

  const last3Movies = ['/movie_posters/1.jpg', '/movie_posters/2.jpg', '/movie_posters/3.jpg'];
  const posterStyles = 'flex-1 rounded-lg w-1/3 object-cover';
  const h2Style = 'mt-8 text-2xl font-semibold';

  return (
    <>
      <section>
        <h1 className="mt-16 text-4xl font-bold">
          Bienvenue dans votre <span className="text-orange-primary">ciné-club</span> virtuel !
        </h1>
        <div className="mt-8 flex justify-between">
          <Button to={'/films'}>Découvrir les films</Button>
          <Button
            to={'/inscription'}
            customStyle={'empty'}>
            {'S\'inscrire'}
          </Button>
        </div>
        <h2 className={h2Style}>Les derniers ajouts de la communauté :</h2>
        <div className="w-full mt-8 flex gap-2">
          {
            //to be adapted with the fetched datas
            last3Movies.map((imageUrl) => (
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
      </section>
      <section className="relative z-10 pb-8 before:absolute before:-z-10 before:inset-y-0 before:-inset-x-[100px] before:w-[5000px] before:bg-medium-gray ">
        <h2 className={h2Style + ' mb-8'}>Chaque semaine, un film à découvrir !</h2>
        <PosterComponent number={2} />
        <p className="-mt-8">
          <span className="text-orange-primary font-medium">Cinévoraces </span>
          <span>
            {'rassemble depuis 2020 des passionnés de tous les cinémas. Comédies, blockbusters d\'action, drames, horreur, thrillers, films d’auteurs... tous les genres sont représentés !'}
          </span>
          <br/>
          <span>{'Sur le même principe qu’un club de lecture, chaque semaine, un membre de la communauté propose un film à visionner. Il est ensuite commenté et noté directement sur la page du film, ou fait l\'objet de débats et discussions sur '}</span></p>
        <Link href={'#/Discord'} className='text-orange-primary font-medium'>notre serveur Discord.</Link>
        <p>
          <br/>
          {'Envie de rejoindre l\'aventure ?'}
        </p>
        <Link href={'/inscription'} className='text-orange-primary font-medium'>inscrivez-vous</Link>
        <p className='mb-8'> pour échanger entre cinéphages et partager vos films préférés avec la communauté.</p>
        <div className='flex'>
          <Button
            to={'/inscription'}
            customStyle='rounded'>
            {'S\'inscrire'}
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
