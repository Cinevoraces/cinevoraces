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

interface PostersComponentProps {
  number: 2 | 3 | 8;
}

/**
 * @returns Component composed of a various number of movie posters
 * @param number number of posters to display
 */
const MultiplePosters = ({ number }: PostersComponentProps) => {
  const posters = generatePosterArray('/movie_posters/', '.jpg', number);
  const posterStyles = 'absolute w-[1/2] rounded-lg object-cover shadow-lg';
  const indivStyles = [
    'left-0 top-0', //Style for 2 - 3 - 8 configurations
    'right-[25%] bottom-0', //Style for 2 - 3 - 8 configurations
    'right-0 bottom-[16%]', //Style for 3 - 8 configurations
    'right-0 top-[5%]',
    'left-[5%] bottom-[5%]',
    'right-[8%] bottom-[12%]',
    'left-[7%] bottom-[26%]',
    'left-[25%] bottom-[13%]',
  ];
  return (
    <div className="relative w-full aspect-square max-w-md">
      {posters.map((poster, i) => (
        <Image
          src={poster}
          alt="movie poster"
          width={200}
          height={(200 * 9) / 16}
          className={posterStyles + ' ' + indivStyles[i]}
          key={poster}
        />
      ))}
    </div>
  );
};

export default MultiplePosters;
