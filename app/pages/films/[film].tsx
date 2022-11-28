import React, { useState } from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import type { ParsedUrlQuery } from 'querystring';
import { getDataFromEndpointSSR } from '@utils/fetchApi';
import type { MinimalMovie, CompleteMovie } from '@custom_types/types';
import { PresentationSection, CommentsSection } from '@components/FilmPageComponents';

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
    presentation: { author_avatar, author_pseudo, author_role, presentation },
    metrics: { watchlist_count, views_count, likes_count, ratings_count, avg_rating },
    comments,
    user_review,
  } = props.movie;

  const PresentationSectionProps = {
    french_title, poster_url, release_date, publishing_date,
    watchlist_count, views_count, likes_count, ratings_count, avg_rating,
    directors, genres, countries, languages, casting,
    author_avatar, author_pseudo, author_role, presentation
  };

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
          <>
            <PresentationSection {...PresentationSectionProps}/>
            <CommentsSection comments={comments} />
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
