/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import CustomHead from '@components/Head';
import useSWR from 'swr';
import {
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
} from '@components/FilmPageComponents';
import { Button, BaseInteraction, RatingInteraction } from '@components/Input';
import PostCard from '@components/PostCard';
import { CommentsSection } from '@components/FilmPageComponents';
import { getDataFromEndpointSSR, mutationRequestCSR } from '@utils/fetchApi';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import { toast } from 'react-hot-toast';
import cutText from '@utils/cutText';
import type { NextPage, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { MinimalMovie, CompleteMovie } from '@custom_types/movies';
import type { BodyData } from '@utils/fetchApi';
import { useRouter } from 'next/router';
import Loader from '@components/Loader';
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

const Film: NextPage<FilmProps> = ({ movies }) => {
  const router = useRouter();
  if (router.isFallback){
    return (
      <main className='custom-container'>
        <Loader/>
      </main>
    );
  }
  const movieId = movies[0].id;
  const userId = useAppSelector(user).id;
  // Defining cache management and inititializing it with initial props :
  const { data, mutate } = useSWR(`/movies?where[id]=${movieId}` + selectQueryString, { fallbackData: movies });
  // Safeguard mostly for TS type assertion
  if (!data || data?.length === 0) throw new Error('Le film demandé n\'a pas été retrouvé.');
  // Basic data extraction
  const movie = data[0];
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

  // data isn't used here, just let for future improvements and manipulations
  const reviewMutation = async (
    type: 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment',
    data: CompleteMovie[] | undefined
  ) => {
    // Initial state for cache
    const defaultUserReview = { bookmarked: false, viewed: false, liked: false, rating: null, comment: null };
    // Determinate property label for user_review properties other than comment
    let metricProp ='';
    if (type !== 'comment'){
      metricProp = baseInteractionsArray.filter((i) => i.type === type)[0].counterName;
    }
    // Deal both with user_review absence or presence in cache
    const review = user_review ? user_review : defaultUserReview;
    switch (type){
      default:
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
      case 'rating':
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
      case 'comment':
        if (!commentFormRef.current){
          return;
        }
        return [
          {
            ...movie,
            user_review: { ...review, comment: commentFormRef.current.value },
          }
        ];
    }
  };

  const handleInteraction = async (type: 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment') => {
    if (!userId) {
      return toast.error('Connectez-vous d\'abord.');
    }
    const body: BodyData = {};
    // 1 - Mutate the cache first, without revalidation
    const mutatedData = await mutate(await reviewMutation(type, data), false);
    // 2 - Do the API call
    body[type] = mutatedData![0].user_review![type];
    const res = await mutationRequestCSR('PUT', `/reviews/${movieId}`, body);
    if (res.message && type === 'comment') toast.success('Votre commentaire a été publié / édité.');
    //3 - Then enventually trigger cache revalidation
    mutate();
  };

  // Ref value for rating storage
  const radioInputValue = useRef<number | null>(null);
  const ratingHandler = (e: FormEvent) => {
    if (radioInputValue && e.target && e.target instanceof HTMLInputElement) {
      radioInputValue.current = Number(e.target.value);
      handleInteraction('rating');
    }
  };

  const commentFormRef = useRef<HTMLTextAreaElement>(null);
  const handleCommentSubmit = (e: FormEvent<Element>) => { 
    e.preventDefault();
    handleInteraction('comment');
  };

  // If user logs directly on this page after rendering, hydrate the page with its review
  useEffect(() => {
    mutate(); 
  }, [mutate, userId]);

  const [cutPresentationText, isPresentationCut] = cutText(movie.presentation.presentation, 700);
  const [isPresentationExpanded, setIsPresentationExpanded] = useState(false);
  const toggleExpandPresentation = () => {
    setIsPresentationExpanded(!isPresentationExpanded);
  };

  return (
    <>
      <CustomHead
        title={`Cinévoraces - ${french_title}`}
        description={`Découvrez ${french_title}`}
        slug={router.asPath}
        imageUrl={movie.poster_url}
      />
      <main className="custom-container ">
        {Object.keys(movie).length === 0 && <p>Loading</p>}
        {movie && (
          <>
            <section
              id="movie-presentation"
              // className="flex flex-col gap-6 sm:flex-row sm:justify-center ">
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 xl:gap-16 ">
              <div
                id="poster-interactions"
                className="flex gap-6 mx-auto sm:flex-col sm:flex-0 self-top xl:col-span-2 xl:w-full">
                <Poster {...movie} />
                <div
                  id="interactions"
                  className="flex flex-col h-full justify-around self-center sm:justify-between sm:flex-row sm:gap-3 lg:w-full ">
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
                    ratingHandler={ratingHandler}
                    value={(user_review?.rating) ? user_review.rating : undefined}
                  />
                </div>
              </div>
              <div id='metadatas' className='flex flex-col gap-3 xl:col-span-3 xl:w-full'>
                <Title {...movie} />
                <OriginalTitle {...movie} />
                <Rating rate={avg_rating} type='global' />
                {
                  (user_review && typeof user_review.rating === 'number' && user_review.rating !== 0 ) &&
                    <Rating rate={user_review.rating} type='user' />
                }
                <Directors {...movie} />
                <Genres {...movie} />
                <Countries {...movie} />
                <Languages {...movie} />
                <Runtime {...movie} />
                <Casting {...movie} />
              </div>
              <div id='presentation' className='sm:col-span-2 lg:col-span-1 xl:col-span-3 '>
                <PostCard
                  type="presentation"
                  {...movie.presentation}
                  created_at={movie.publishing_date}
                >
                  <p className='text-ellipsis'>
                    {
                      (!isPresentationCut || isPresentationExpanded) ?
                        movie.presentation.presentation
                        : cutPresentationText
                    }
                  </p>
                  {
                    (isPresentationCut) &&
                    <div className='flex justify-end'>
                      <Button onClick={toggleExpandPresentation} customStyle='rounded'>
                        {
                          (!isPresentationExpanded) ? 'Voir plus...' : 'Réduire'
                        }
                      </Button>
                    </div>
                  }
                </PostCard>
              </div>
            </section>
            <CommentsSection {...movie} ref={commentFormRef} onSubmit={(e) => handleCommentSubmit(e)} />
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticPaths: ()=>Promise<{ paths: { params: {} }[]; fallback: boolean | string; } | []> = async () => {
  try {
    const movies = await getDataFromEndpointSSR('/movies?where[is_published]=true');
    const paths = movies.map((movie: MinimalMovie) => ({ params: { film: '' + movie.id } }));
    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getStaticProps: GetStaticProps<FilmProps, Params> = async (context) => {
  const { film: id } = context.params!;
  try {
    const result = await getDataFromEndpointSSR(`/movies?where[id]=${id}` + selectQueryString);
    if (result.message === 'Aucun film trouvé') throw new Error(result.message);
    return {
      props: {
        movies: result,
        revalidate: 60,
      },
    };
  } catch (err){
    return { notFound: true };
  }
};

