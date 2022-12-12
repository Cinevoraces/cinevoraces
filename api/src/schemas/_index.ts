import { apiErrorSchema } from './apiError';
import { globalMetricsSchema, userMetricsSchema } from './metrics';
import { movieSchema } from './movie';
import { reviewSchema } from './review';
import { slotSchema } from './slot';
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
  reviewSchema,
  slotSchema,
  userMetricsSchema,
  userSchema,
];
