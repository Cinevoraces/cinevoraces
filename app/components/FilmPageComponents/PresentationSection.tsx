import React from 'react';
import Image from 'next/image';
import Rate from '@components/Rate';

const dataTitleStyle = 'text-lg uppercase text-light-gray pr-4 ';
const dataStyle = 'text-white ';

interface PosterProps {
  poster_url: string;
  french_title: string;
}
const Poster = ({ poster_url, french_title }: PosterProps) => {
  return (
    <div
      id="image-container"
      className="relative h-fit 
        before:content-[''] before:absolute before:-inset-0.5 before:bg-gradient-to-tr before:from-dark-gray before:to-orange-primary before:rounded-xl">
      <Image
        src={poster_url}
        alt={`Affiche de ${french_title}`}
        width={240}
        height={(240 * 9) / 16}
        className="relative z-10 rounded-xl self-center "
      />
    </div>
  );
};

interface TitleProps {
  french_title: string;
  release_date: string;
}
const Title = ({ french_title, release_date }: TitleProps) => {
  return (
    <h1 className="mb-6 text-3xl font-semibold text-white">
      {french_title + ' '}
      <span className="text-base font-light text-light-gray">{`(${release_date?.slice(0, 4)})`}</span>
    </h1>
  );
};
interface OriginalTitleProps {
  original_title: string;
}
const OriginalTitle = ({ original_title }: OriginalTitleProps) => {
  return (
    <div
      id="original-title"
      className="flex items-center">
      <p className={dataTitleStyle}>Titre original :</p>
      <p className={dataStyle}>{original_title}</p>
    </div>
  );
};
interface RatingProps {
  rate: number;
  type: 'global' | 'user';
}
const Rating = ({ rate, type }: RatingProps) => {
  return (
    <div
      id="global-rating"
      className="flex justify-between">
      <p className={dataTitleStyle}>
        {
          (type === 'global') ? 'Note des Membres :' : 'Ma note :'
        }
      </p>
      <Rate rate={rate} />
    </div>
  );
};
interface DirectorsProps {
  directors: string[];
}
const Directors = ({ directors }: DirectorsProps) => {
  return (
    <div
      id="directors"
      className="flex justify-between items-center">
      <p className={dataTitleStyle + 'place-self-start'}>{'Réalisation :'}</p>
      <ul className={dataStyle + 'mt-1 flex-1 flex flex-col'}>
        {directors.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
};
interface GenresProps {
  genres: string[];
}
const Genres = ({ genres }: GenresProps) => {
  return (
    <div
      id="genres"
      className="flex justify-between items-center">
      <p className={dataTitleStyle}>{genres.length > 1 ? 'Genres :' : 'Genre :'}</p>
      <ul className={dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
        {genres.map((g, i) => (
          <li key={g}>{i != genres.length - 1 ? `${g},` : g}</li>
        ))}
      </ul>
    </div>
  );
};
interface CountriesProps {
  countries: string[];
}
const Countries = ({ countries }: CountriesProps) => {
  return (
    <div
      id="countries"
      className="flex justify-between items-center">
      <p className={dataTitleStyle}>{countries.length > 1 ? 'Pays :' : 'Genre :'}</p>
      <ul className={dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
        {countries.map((c, i) => (
          <li key={c}>{i != countries.length - 1 ? `${c},` : c}</li>
        ))}
      </ul>
    </div>
  );
};
interface LanguagesProps {
  languages: string[];
}
const Languages = ({ languages }: LanguagesProps) => {
  return (
    <div
      id="languages"
      className="flex justify-between items-center">
      <p className={dataTitleStyle}>{languages.length > 1 ? 'Langues :' : 'Langue :'}</p>
      <ul className={dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
        {languages.map((l, i) => (
          <li key={l}>{i != languages.length - 1 ? `${l},` : l}</li>
        ))}
      </ul>
    </div>
  );
};
interface RuntimeProps {
  runtime: number;
}
const Runtime = ({ runtime }: RuntimeProps) => {
  return (
    <div
      id="runtime"
      className="flex items-center">
      <p className={dataTitleStyle}>Durée :</p>
      <p className={dataStyle}>{`${runtime} min.`}</p>
    </div>
  );
};
interface CastingProps {
  casting: string[];
}
const Casting = ({ casting }: CastingProps) => {
  return (
    <div
      id="casting"
      className="flex justify-between items-center">
      <p className={dataTitleStyle + 'place-self-start'}>{'Casting :'}</p>
      <ul className={dataStyle + 'mt-1 flex-1 flex flex-col'}>
        {casting.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  );
};

export {
  Poster,
  Title,
  OriginalTitle,
  Rating,
  Directors,
  Genres,
  Countries,
  Languages,
  Runtime,
  Casting,
};
