import { auth } from './auth/auth.routes';
import { metrics } from './metrics/metrics.routes';
import { movies } from './movies/movies.routes';
import { reviews } from './reviews/reviews.routes';
import { seasons } from './seasons/seasons.routes';
import { episodes } from './episodes/episodes.routes';
import { users } from './users/users.routes';

/**
 * * **Routes _index**
 * @description
 * Routes are used to define the structure of the API.
 * Add any new route to this array.
 */
export const routes = [
  auth,
  metrics,
  movies,
  reviews,
  seasons,
  episodes,
  users
];
