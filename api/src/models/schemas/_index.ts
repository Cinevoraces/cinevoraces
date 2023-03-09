import type { FastifySchema } from 'fastify';
import { GETFile } from './controller.public';
import {
  PUTMoviesAsAdmin,
  DELETEMoviesAsAdmin, 
  GETReviewsAsAdmin,
  DELETEReviewsAsAdmin,
  POSTSeasonsAsAdmin,
  DELETEUsersAsAdmin,
  PUTMoviesPosterAsAdmin,
} from './controller.Admin';
import { POSTLogin, POSTRegister, GETRefresh } from './controller.auth';
import { GETEpisodes } from './controller.episodes';
import { GETMetrics } from './controller.metrics';
import {
  GETMovies,
  GETRandomMoviePosters,
  POSTMovies,
  PUTMovies,
} from './controller.movies';
import { PUTReviews } from './controller.reviews';
import { GETSeasons } from './controller.seasons';
import { GETPublicUsers, GETPrivateUsers, PUTUsers, PUTUsersAvatar } from './controller.users';
import { Error } from './Error';
import { IEpisode } from './item.episode';
import { IGlobalMetrics } from './item.metrics';
import { IUserMetrics } from './item.metrics';
import { IMovie } from './item.movie';
import { IReducedMovie } from './item.movie';
import { IReview } from './item.review';
import { ISeason } from './item.season';
import { IPublicUser } from './item.publicUser';
import { IPrivateUser } from './item.privateUser';

/**
 * **Schemas Registration _index**
 * Add any new schema to this array.
 */
export default [
  // Controller schemas
  PUTMoviesAsAdmin,
  DELETEMoviesAsAdmin,
  GETReviewsAsAdmin,
  DELETEReviewsAsAdmin,
  POSTSeasonsAsAdmin,
  DELETEUsersAsAdmin,
  PUTMoviesPosterAsAdmin,
  GETFile,
  POSTLogin,
  POSTRegister,
  GETRefresh,
  GETEpisodes,
  GETMetrics,
  GETMovies,
  GETRandomMoviePosters,
  POSTMovies,
  PUTMovies,
  PUTReviews,
  GETSeasons,
  GETPublicUsers,
  GETPrivateUsers,
  PUTUsers,
  PUTUsersAvatar,
  // Global schemas
  Error,
  // Item schemas
  IEpisode,
  IGlobalMetrics,
  IUserMetrics,
  IMovie,
  IReducedMovie,
  IReview,
  ISeason,
  IPublicUser,
  IPrivateUser,
] as Array<FastifySchema>;
