import React from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import { getDataFromEndpointSSR } from '@utils/fetchApi';
import type { MinimalMovie, CompleteMovie } from '@custom_types/types';
import { CommentsSection } from '@components/FilmPageComponents';
import useSWR from 'swr';
import {
  Poster,
  Title,
  OriginalTitle,
  GlobalRating,
  Directors,
  Genres,
  Countries,
  Languages,
  Runtime,
  Casting,
} from '@components/FilmPageComponents';
import Interaction from '@components/Input/Interaction/Interaction';
import PostCard from '@components/PostCard';

interface FilmProps {
  movies: CompleteMovie[];
}

// Data fetching global conf for both ISR and SWR cache
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

const Film: NextPage<FilmProps> = (props: FilmProps) => {
  const id = props.movies[0].id;
  // Defining cache management and inititializing it with initial props :
  const { data } = useSWR(`/movies?where[id]=${id}` + selectQueryString, { fallbackData: props.movies });
  // Safeguard mostly for TS type assertion
  if (!data || data.length === 0) throw new Error('Le film demandé n\'a pas été retrouvé.');
  const movie = data[0];
  const { french_title, 
    metrics: { watchlist_count, views_count, likes_count, ratings_count, avg_rating }, 
    user_review,
  } = movie;

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
        {Object.keys(movie).length === 0 && (<p>Loading</p>)}
        {movie && (
          <>
            <section id="movie-presentation" className="flex flex-col gap-10">
              <div
                id="poster-interactions"
                className="flex gap-10">
                <Poster {...movie}/>
                <div id="interactions" className="flex flex-col gap-6 ">
                  <Interaction type="bookmark" counter={watchlist_count} isClicked={(!user_review || !user_review.bookmarked) && false}
                    onClick={() => {
                      console.log('Coucou je viens juste de bookmark !!');
                    }}
                  />
                  <Interaction
                    type="view" counter={views_count} isClicked={(!user_review || !user_review.viewed) && false}
                    onClick={() => {
                      console.log('Coucou je viens juste de view !!');
                    }}
                  />
                  <Interaction
                    type="like" counter={likes_count} isClicked={(!user_review || !user_review.liked) && false}
                    onClick={() => {
                      console.log('Coucou je viens juste de like !!');
                    }}
                  />
                  <Interaction
                    type="starButton" counter={ratings_count} isClicked={(!user_review || !user_review.rating) ? false : true}
                    onClick={() => {
                      console.log('Coucou je viens juste de star !!');
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <Title {...movie}/>
                <OriginalTitle {...movie}/>
                <GlobalRating avg_rating={avg_rating}/>
                <Directors {...movie}/>
                <Genres {...movie}/>
                <Countries {...movie}/>
                <Languages {...movie}/>
                <Runtime {...movie}/>
                <Casting {...movie}/>
                <PostCard type='presentation' {...movie.presentation}/>
              </div>
            </section>
            <CommentsSection {...movie} />
          </>
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
  try {
    const result = await getDataFromEndpointSSR(`/movies?where[id]=${id}` + selectQueryString);
    if (!result[0]) throw new Error('Le film demandé n\'existe pas');
    // Type of result have to be a movie[] since we use SWR for cache management
    return {
      props: {
        movies: result,
        revalidate: 60,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
