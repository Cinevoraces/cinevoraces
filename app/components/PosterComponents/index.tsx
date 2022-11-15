import React from 'react';
import Image from 'next/image';

const generatePosterArray = (path: string, extension: string, number: number) => {
  const posterArray = [] as number[];
  while (posterArray.length < number) {
    const randNum = Math.floor(Math.random() * 15 + 1); // 15 posters for the static component
    !posterArray.includes(randNum) && posterArray.push(randNum);
  }
  return posterArray.map((randNum) => path + randNum + extension);
};

interface PosterComponentProps {
  number: 2 | 3 | 8;
}

export default function PosterComponent({ number }: PosterComponentProps) {
  const posters = generatePosterArray('/movie_posters/', '.jpg', number);
  const posterStyles = 'absolute w-1/2 rounded-lg object-cover shadow-lg';
  const indivStyles = ['left-[10%]', 'z-10 left-[40%] top-8', 'z-20 left-[20%] top-[30%]'];
  return (
    <div className='relative w-full aspect-square max-w-md'>
      {
        posters.map((poster, i) => (
          <Image
            src={poster}
            alt="movie poster"
            width={200}
            height={200 * 9/16}
            className={posterStyles + ' ' + indivStyles[i]}
            key={poster}
          />))
      }
    </div>
  );
}
