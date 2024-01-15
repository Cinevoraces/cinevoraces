/**
 * Models
 */
export type { PostMovie, PutMovie } from './MoviePayloads';
export type { QueryString } from './Querystring';
export type { Episode } from './models/Episode';
export type { Movie } from './models/Movie';
export type { ReducedMovie } from './models/ReducedMovie';
export type { Review } from './models/Review';
export type { Season } from './models/Season';
export type { User } from './models/User';
export type { UserMetrics } from './models/UserMetrics';

/**
 * Enums
 */
export { EDocType } from './enums/EDocType';
export { EErrorMessages } from './enums/EErrorMessages';
export { EMimeType } from './enums/EMimeTypes';
export { EResponseMessages } from './enums/EResponseMessages';
export { EAddReview, EReview, EUpdateReview } from './enums/EReview';
export { ERoles } from './enums/ERoles';
export { ESchemasIds } from './enums/ESchemasIds';

/**
 * Schemas
 */
import type { FastifySchema } from 'fastify';
import { Error } from './schemas/Error';
import {
    DELETEMoviesAsAdmin,
    DELETEReviewsAsAdmin,
    DELETEUsersAsAdmin,
    GETReviewsAsAdmin,
    POSTSeasonsAsAdmin,
    PUTMoviesAsAdmin,
    PUTMoviesPosterAsAdmin,
} from './schemas/controller.Admin';
import { GETRefresh, POSTLogin, POSTRegister } from './schemas/controller.auth';
import { GETEpisodes } from './schemas/controller.episodes';
import { GETMetrics } from './schemas/controller.metrics';
import { GETMovies, GETRandomMoviePosters, POSTMovies, PUTMovies } from './schemas/controller.movies';
import { GETFile } from './schemas/controller.public';
import { PUTReviews } from './schemas/controller.reviews';
import { GETSeasons } from './schemas/controller.seasons';
import { GETPrivateUsers, GETPublicUsers, PUTUsers, PUTUsersAvatar } from './schemas/controller.users';
import { IEpisode } from './schemas/item.episode';
import { IGlobalMetrics, IUserMetrics } from './schemas/item.metrics';
import { IMovie, IReducedMovie } from './schemas/item.movie';
import { IPrivateUser } from './schemas/item.privateUser';
import { IPublicUser } from './schemas/item.publicUser';
import { IReview } from './schemas/item.review';
import { ISeason } from './schemas/item.season';
export const schemas = [
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

// To remove with fastify/jwt
import type { ERoles } from './enums/ERoles';
declare module '@fastify/jwt' {
    interface VerifyOptions {
        onlyCookie: boolean;
    }
    interface FastifyJWT {
        user: {
            id?: number;
            pseudo?: string;
            mail?: string;
            role?: ERoles;
            document_group_id?: number;
            previous_review?: {
                comment?: string;
                rating?: number;
                bookmarked?: boolean;
                viewed?: boolean;
                liked?: boolean;
            };
        };
    }
}
