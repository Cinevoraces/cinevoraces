import { apiErrorSchema } from './apiError';
import { globalMetricsSchema, userMetricsSchema } from './metrics';
import { movieSchema, reducedMovieSchema } from './movie';
import { reviewSchema } from './review';
import { seasonSchema } from './season';
import { episodeSchema } from './episode';
import { userSchema } from './user';

/**
 * * **Schemas _index**
 * @description
 * Schemas are used to define and validate data structure of requests and responses.
 * Add any new schema to this array.
 */
export const schemas = [
  apiErrorSchema,
  globalMetricsSchema,
  movieSchema,
  reducedMovieSchema,
  reviewSchema,
  seasonSchema,
  episodeSchema,
  userMetricsSchema,
  userSchema,
];
