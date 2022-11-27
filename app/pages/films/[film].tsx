import React, { useState } from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import type { ParsedUrlQuery } from 'querystring';
import { getDataFromEndpointSSR } from '@utils/fetchApi';
import type { MinimalMovie, CompleteMovie } from '@custom_types/types';
import { Interaction } from '@components/Input';
import Rate from '@components/Rate';
import Metrics from '@components/Metrics';

interface FilmProps {
  movie: CompleteMovie;
}

const Film: NextPage<FilmProps> = (props: FilmProps) => {
  const {
    id,
    author_id,
    season_number,
    is_published,
    french_title,
    original_title,
    poster_url,
    casting,
    directors,
    runtime,
    publishing_date,
    release_date,
    genres,
    countries,
    languages,
    presentation,
    metrics: { watchlist_count, views_count, likes_count, ratings_count, avg_rating },
    comments,
    user_review,
  } = props.movie;
  // const { watchlist_count,  } = metrics!;
  // Temp states to delete later
  const [isClickedBookmark, setIsClickedBookmark] = useState(false);
  const [isClickedLike, setIsClickedLike] = useState(false);
  const [isClickedStar, setIsClickedStar] = useState(false);
  const [rating, setRating] = useState(null);
  const [isClickedView, setIsClickedView] = useState(false);

  const dataTitleStyle = 'text-lg uppercase text-light-gray pr-4 ';
  const dataStyle = 'text-white ';

  return (
    <>
      <Head>
        <title>{`Cinévoraces - ${french_title}`}</title>
        <meta
          name="description"
          content={`Découvrez le film ${french_title}`}
        />
      </Head>
      <main className="container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-between gap-8">
        {Object.keys(props).length === 0 && <p>Loading</p>}
        {props.movie && (
          <section
            id="movie-presentation"
            className="flex flex-col gap-10">
            <div
              id="poster-interactions"
              className="flex gap-10">
              <div id='image-container' className="relative before:content-[''] before:absolute before:-inset-0.5 before:bg-gradient-to-tr before:from-dark-gray before:to-orange-primary before:rounded-xl">
                <Image
                  src={poster_url}
                  alt={`Affiche de ${french_title}`}
                  width={240}
                  height={(240 * 9) / 16}
                  className="relative z-10 rounded-xl "
                />
              </div>
              <div
                id="interactions"
                className="flex flex-col gap-8">
                <Interaction
                  type="bookmark"
                  counter={125}
                  isClicked={isClickedBookmark}
                  onClick={() => {
                    console.log('Coucou je viens juste de bookmark !!');
                    setIsClickedBookmark(!isClickedBookmark);
                  }}
                />
                <Interaction
                  type="like"
                  counter={125}
                  isClicked={isClickedLike}
                  onClick={() => {
                    console.log('Coucou je viens juste de like !!');
                    setIsClickedLike(!isClickedLike);
                  }}
                />
                <Interaction
                  type="starButton"
                  counter={125}
                  isClicked={isClickedStar}
                  onClick={() => {
                    console.log('Coucou je viens juste de star !!');
                    setIsClickedStar(!isClickedStar);
                  }}
                />
                <Interaction
                  type="view"
                  counter={125}
                  isClicked={isClickedView}
                  onClick={() => {
                    console.log('Coucou je viens juste de view !!');
                    setIsClickedView(!isClickedView);
                  }}
                />
              </div>
            </div>
            <div id="metadatas">
              <h1 className="mb-6 text-3xl font-semibold text-white">
                {props.movie.french_title + ' '}
                <span className="text-base font-light text-light-gray">{`(${release_date?.slice(0, 4)})`}</span>
              </h1>
              <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                  <p className={dataTitleStyle}>Note des Membres :</p>
                  <Rate rate={avg_rating}/>
                </div>
                <div id='directors' className='flex justify-between items-center'>
                  <p className={dataTitleStyle + 'place-self-start'}>{ 'Réalisation :'}</p>
                  <ul className={ dataStyle + 'mt-1 flex-1 flex flex-col'}>
                    {
                      directors.map((d) => (<li key={d}>{d}</li>))
                    }
                  </ul>
                </div>
                <div id='genres' className='flex justify-between items-center'>
                  <p className={dataTitleStyle}>{ (genres.length > 1) ? 'Genres :' : 'Genre :'}</p>
                  <ul className={ dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
                    {
                      genres.map((g, i) => (<li key={g}>{(i != genres.length - 1)? `${g},` : g}</li>))
                    }
                  </ul>
                </div>
                <div id='countries' className='flex justify-between items-center'>
                  <p className={dataTitleStyle}>{ (genres.length > 1) ? 'Countries :' : 'Genre :'}</p>
                  <ul className={ dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
                    {
                      countries.map((c, i) => (<li key={c}>{(i != countries.length - 1)? `${c},` : c}</li>))
                    }
                  </ul>
                </div>
                <div id='languages' className='flex justify-between items-center'>
                  <p className={dataTitleStyle}>{ (genres.length > 1) ? 'Langues :' : 'Langue :'}</p>
                  <ul className={ dataStyle.replace('text-white', 'text-orange-primary') + 'flex-1 flex gap-1 items-end'}>
                    {
                      languages.map((l, i) => (<li key={l}>{(i != languages.length - 1)? `${l},` : l}</li>))
                    }
                  </ul>
                </div>
                <div id='casting' className='flex justify-between items-center'>
                  <p className={dataTitleStyle + 'place-self-start'}>{ 'Casting :'}</p>
                  <ul className={ dataStyle + 'mt-1 flex-1 flex flex-col'}>
                    {
                      casting.map((a) => (<li key={a}>{a}</li>))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Film;

interface Params extends ParsedUrlQuery {
  article: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const movies = await getDataFromEndpointSSR('/movies?where[is_published]=true');
  const paths = movies.map((movie: MinimalMovie) => ({ params: { film: '' + movie.id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<FilmProps, Params> = async (context) => {
  const { film: id } = context.params!;
  const metadatas = [
    'casting',
    'directors',
    'runtime',
    'release_date',
    'genres',
    'countries',
    'languages',
    'presentation',
    'metrics',
    'comments',
  ];
  let selectQueryString: string = '';
  metadatas.forEach((dataName) => (selectQueryString += `&select[${dataName}]=true`));

  try {
    const result = await getDataFromEndpointSSR(`/movies?where[id]=${id}` + selectQueryString);
    console.log('results: ', result);
    if (!result[0]) throw new Error('Le film demandé n\'existe pas');
    return {
      props: {
        movie: result[0],
        revalidate: 60,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
