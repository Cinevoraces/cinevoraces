import React, { useState } from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import type { ParsedUrlQuery } from 'querystring';
import { getDataFromEndpointSSR } from '@utils/fetchApi';
import type { Movie } from '@custom_types/types';
import { Interaction } from '@components/Input';
import Rate from '@components/Rate';
import Metrics from '@components/Metrics';

interface FilmProps{
  movie: Movie;
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
    metrics,
    comments,
    user_review,
  } = props.movie;
  // Temp states
  const [isClickedBookmark, setIsClickedBookmark] = useState(false);
  const [isClickedLike, setIsClickedLike] = useState(false);
  const [isClickedStar, setIsClickedStar] = useState(false);
  const [rating, setRating] = useState(null);
  const [isClickedView, setIsClickedView] = useState(false);
  return (
    <>
      <Head>
        <title>{`Cinévoraces - ${french_title}`}</title>
        <meta name='description' content={`Découvrez le film ${french_title}`} />
      </Head>
      <main className='container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-between gap-8'>
        {
          (Object.keys(props).length === 0) && <p>Loading</p>
        }
        {
          props.movie && (
            <section id='movie-presentation' className='flex flex-col gap-10'>
              <div id='poster-interactions' className='flex gap-10'>
                <Image src={poster_url} alt={`Affiche de ${french_title}`} width={240} height={360} className='rounded-xl'/>
                <div id='interactions' className='flex flex-col gap-8'>
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
              <div id='metadatas'>
                <h1 className='text-3xl font-semibold'>
                  {props.movie.french_title + ' '}
                  <span className='text-base font-light text-light-gray'>{`(${release_date?.slice(0, 4)})`}</span>
                </h1>
                {/* <Rate rate={}/> */}
              </div>
            </section>
          )
        }
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
  const paths = movies.map((movie: Movie) => ({ params: { film: '' + movie.id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<FilmProps, Params> = async (context) => {
  const { film: id } = context.params!;
  const metadatas = ['casting', 'directors', 'runtime', 'release_date', 'genres', 'countries', 'languages', 'presentation', 'metrics', 'comments'];
  let selectQueryString: string = '';
  metadatas.forEach((dataName) => (selectQueryString += `&select[${dataName}]=true`));

  try {
    const result = await getDataFromEndpointSSR(
      `/movies?where[id]=${id}` + selectQueryString
    );
    console.log('results: ', result);
    if (!result[0]) throw new Error('Le film demandé n\'existe pas');
    return {
      props: {
        movie: result[0],
        revalidate:60,
      }
    };
  } catch (err) {
    return { notFound: true };
  };
};
