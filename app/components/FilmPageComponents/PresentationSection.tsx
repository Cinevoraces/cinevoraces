import React, { useState } from 'react';
import Image from 'next/image';
import Interactions from './Interactions';
import Rate from '@components/Rate';
import PostCard from '@components/PostCard';

interface PresentationSectionProps {
  poster_url: string;
  french_title: string;
  release_date: string;
  original_title: string;
  genres: string[];
  directors: string[];
  countries: string[];
  languages: string[];
  runtime: number;
  casting: string[];
  watchlist_count: number;
  views_count: number;
  likes_count: number;
  ratings_count: number;
  avg_rating: number;
  author_avatar: string;
  author_pseudo: string;
  publishing_date: string;
  author_role: string;
  presentation: string;
}

export default function PresentationSection({
  poster_url, french_title, release_date, original_title,
  genres, directors, countries, languages, runtime, casting,
  watchlist_count, views_count, likes_count, ratings_count,
  avg_rating,
  author_avatar, author_pseudo, publishing_date, author_role, presentation,
}: PresentationSectionProps) {
  const presentationProps = { author_avatar, author_pseudo, author_role, presentation, publishing_date };
  const interactionsProps = { watchlist_count, likes_count, ratings_count, views_count };
  const dataTitleStyle = 'text-lg uppercase text-light-gray pr-4 ';
  const dataStyle = 'text-white ';

  return (
    <section
      id="movie-presentation"
      className="flex flex-col gap-10">
      <div
        id="poster-interactions"
        className="flex gap-10">
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
        <Interactions {...interactionsProps} />
      </div>
      <div id="metadatas">
        <h1 className="mb-6 text-3xl font-semibold text-white">
          {french_title + ' '}
          <span className="text-base font-light text-light-gray">{`(${release_date?.slice(0, 4)})`}</span>
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className={dataTitleStyle}>Note des Membres :</p>
            <Rate rate={avg_rating} />
          </div>
          <div
            id="original-title"
            className="flex items-center">
            <p className={dataTitleStyle}>Titre original :</p>
            <p className={dataStyle}>{original_title}</p>
          </div>
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
          <div
            id="countries"
            className="flex justify-between items-center">
            <p className={dataTitleStyle}>{genres.length > 1 ? 'Pays :' : 'Genre :'}</p>
            <ul className={dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
              {countries.map((c, i) => (
                <li key={c}>{i != countries.length - 1 ? `${c},` : c}</li>
              ))}
            </ul>
          </div>
          <div
            id="languages"
            className="flex justify-between items-center">
            <p className={dataTitleStyle}>{genres.length > 1 ? 'Langues :' : 'Langue :'}</p>
            <ul className={dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
              {languages.map((l, i) => (
                <li key={l}>{i != languages.length - 1 ? `${l},` : l}</li>
              ))}
            </ul>
          </div>
          <div
            id="runtime"
            className="flex items-center">
            <p className={dataTitleStyle}>Durée :</p>
            <p className={dataStyle}>{`${runtime} min.`}</p>
          </div>
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
        </div>
      </div>
      <PostCard
        type="presentation"
        {...presentationProps}
      />
    </section>
  );
}
