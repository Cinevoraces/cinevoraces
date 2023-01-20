import type { CompleteMovie, Interactions } from 'models/custom_types/index';
import type { MutableRefObject } from 'react';

/**
 * Handles complex cache mutations due to interaction manipulations
 * Very similar to state management
 * @param type 
 * @param baseInteractionsArray 
 * @param data 
 * @param radioInputValue 
 * @param commentFormRef 
 * @returns mutated data
 */
const reviewMutation = (
  type: 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment',
  baseInteractionsArray: Interactions[],
  data: CompleteMovie[],
  radioInputValue: MutableRefObject<number | null>,
  commentFormRef: React.RefObject<HTMLTextAreaElement>,
)=> {
  // Initial state for cache
  const defaultUserReview = { bookmarked: false, viewed: false, liked: false, rating: null, comment: null };
  // Deal both with user_review absence or presence in cache
  const movie = data[0];
  const review = movie.user_review ? movie.user_review : defaultUserReview;
  switch (type){
    default:
      // Determinate property label for user_review
      const metricProp = baseInteractionsArray.filter((i) => i.type === type)[0].counterName;
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

export default reviewMutation;
