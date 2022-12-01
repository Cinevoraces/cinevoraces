import React, { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import Head from 'next/head';
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
import { BaseInteraction, RatingInteraction } from '@components/Input/Interaction/Interaction';
import PostCard from '@components/PostCard';
import { CommentsSection } from '@components/FilmPageComponents';
import { getDataFromEndpointSSR, mutationRequestCSR } from '@utils/fetchApi';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import { toast } from 'react-hot-toast';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { MinimalMovie, CompleteMovie } from '@custom_types/types';
import type { BodyData } from '@utils/fetchApi';
interface FilmProps {
  movies: CompleteMovie[];
}
interface Interactions {
  type: 'bookmarked' | 'viewed' | 'liked' | 'rating';
  counterName: 'watchlist_count' | 'views_count' | 'likes_count' | 'ratings_count';
  counter: number;
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
  const movieId = props.movies[0].id;
  const userId = useAppSelector(user).id;
  // Defining cache management and inititializing it with initial props :
  const { data, mutate } = useSWR(`/movies?where[id]=${movieId}` + selectQueryString, { fallbackData: props.movies });
  // Safeguard mostly for TS type assertion
  if (!data || data?.length === 0) throw new Error('Le film demandé n\'a pas été retrouvé.');
  // Basic data extraction
  const movie = data[0];
  console.log(movie);
  const {
    french_title,
    metrics: { watchlist_count, views_count, likes_count, ratings_count, avg_rating },
    user_review,
  } = movie;

  const baseInteractionsArray: Interactions[] = [
    { type: 'bookmarked', counterName: 'watchlist_count', counter: watchlist_count },
    { type: 'viewed', counterName: 'views_count', counter: views_count },
    { type: 'liked', counterName: 'likes_count', counter: likes_count },
    { type: 'rating', counterName: 'ratings_count', counter: ratings_count },
  ];

  const reviewMutation = async (
    type: 'bookmarked' | 'viewed' | 'liked' | 'rating',
    data: CompleteMovie[] | undefined
  ) => {
    // Initial state for cache
    const defaultUserReview = { bookmarked: false, viewed: false, liked: false, rating: null };
    // Determinate property label for user_review
    const metricProp = baseInteractionsArray.filter((i) => i.type === type)[0].counterName;
    // Deal both with user_review absence or presence in cache
    const review = user_review ? user_review : defaultUserReview;
    if (type !== 'rating') {
      return [
        {
          ...movie,
          user_review: { ...review, [type]: !review[type] },
          metrics: {
            ...movie.metrics,
            [metricProp]: !review[type] ? movie.metrics[metricProp] + 1 : movie.metrics[metricProp] - 1,
          },
        },
      ];
    }
    return [
      {
        ...movie,
        user_review: { ...review, rating: radioInputValue.current },
        metrics: {
          ...movie.metrics,
          ratings_count: !review.rating ? movie.metrics.ratings_count + 1 : movie.metrics.ratings_count,
          avg_rating: !review.rating
            ? (movie.metrics.avg_rating * movie.metrics.ratings_count + radioInputValue.current!) /
              (movie.metrics.ratings_count + 1)
            : (movie.metrics.avg_rating * movie.metrics.ratings_count - review.rating + radioInputValue.current!) /
              movie.metrics.ratings_count,
        },
      },
    ];
  };

  const handleInteraction = async (type: 'bookmarked' | 'viewed' | 'liked' | 'rating') => {
    if (!userId) {
      return toast.error('Connectez-vous d\'abord.');
    }
    const body: BodyData = {};
    // 1 - Mutate the cache first, without revalidation
    const mutatedData = await mutate(reviewMutation(type, data), false);
    // 2 - Do the API call
    body[type] = mutatedData![0].user_review![type];
    const res = await mutationRequestCSR('PUT', `/reviews/${movieId}`, body);
    //3 - Then enventually trigger cache revalidatio
    mutate();
    console.log(res);
  };

  // Ref value for rating storage
  const radioInputValue = useRef<number | null>(null);
  const ratingHandler = (e: FormEvent) => {
    if (radioInputValue && e.target && e.target instanceof HTMLInputElement) {
      radioInputValue.current = Number(e.target.value);
      handleInteraction('rating');
    }
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
        {Object.keys(movie).length === 0 && <p>Loading</p>}
        {movie && (
          <>
            <section
              id="movie-presentation"
              className="flex flex-col gap-10">
              <div
                id="poster-interactions"
                className="flex gap-10">
                <Poster {...movie} />
                <div
                  id="interactions"
                  className="flex flex-col gap-6 ">
                  {baseInteractionsArray.slice(0, 3).map((i) => (
                    <BaseInteraction
                      type={i.type}
                      counter={i.counter}
                      isClicked={!user_review || !user_review[i.type] ? false : true}
                      onClick={() => handleInteraction(i.type)}
                      key={i.type}
                    />
                  ))}
                  <RatingInteraction
                    counter={ratings_count}
                    isClicked={!user_review || !user_review.rating ? false : true}
                    ref={radioInputValue}
                    ratingHandler={ratingHandler}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Title {...movie} />
                <OriginalTitle {...movie} />
                <GlobalRating avg_rating={avg_rating} />
                <Directors {...movie} />
                <Genres {...movie} />
                <Countries {...movie} />
                <Languages {...movie} />
                <Runtime {...movie} />
                <Casting {...movie} />
                <PostCard
                  type="presentation"
                  {...movie.presentation}
                  created_at={movie.publishing_date}
                >
                  <p>{movie.presentation.presentation}</p>
                </PostCard>
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

