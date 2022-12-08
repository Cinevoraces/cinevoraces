import type { CompleteMovie, Interaction } from '@custom_types/types';

export default async function reviewMutation (
  type: 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment',
  baseInteractionProps: Interaction[],
  data: CompleteMovie[] | undefined
) {
  // Initial state for cache
  const defaultUserReview = { bookmarked: false, viewed: false, liked: false, rating: null, comment: null };
  // Determinate property label for user_review
  const metricProp = baseInteractionsArray.filter((i) => i.type === type)[0].counterName;
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
