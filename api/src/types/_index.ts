// Index file for all types
// Module declaration does not require importation

// ENUMS
export { Env, EEnvValues, EEnvKeys } from './enums/env';
export { ReviewTypes, AddReview, UpdateReview } from './enums/review';
export { ApiError } from './enums/apiError';
export { ApiResponse } from './enums/apiResponse';
export { Tables } from './enums/tables';

// DATABASE
export type { country } from './database/country';
export type { genre } from './database/genre';
export type { language } from './database/language';
export type { movie } from './database/movie';
export type { movie_has_genre } from './database/movie_has_genre';
export type { movie_has_language } from './database/movie_has_language';
export type { movie_has_country } from './database/movie_has_country';
export type { proposition_slot } from './database/proposition_slot';
export type { review } from './database/review';
export type { season } from './database/season';
export type { user } from './database/user';

// ELSE
export type { updateProposedMovie, proposeMovie } from './proposeMoviePayload';
export type { Query } from './query';
