import type Filters from '@src/types/Filters';

export default function filtersFactoryUsers(
  filters: Filters.User
) {
  const populator = {
    pop: {
      movies: false,
      reviews: false,
    },
    metrics: false,
  };
  for (const key in filters) {
    if (key === 'metrics') populator.metrics = filters[key];
    if (key === 'movies') populator.pop.movies = filters[key];
    if (key === 'reviews') populator.pop.reviews = filters[key];
  }
  return populator;
}
