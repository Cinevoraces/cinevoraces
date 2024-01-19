/**
 * Models
 */
export type { PostMovie, PutMovie } from './MoviePayloads';
export type { Episode } from './models/Episode';
export type { Movie } from './models/Movie';
export type { ReducedMovie } from './models/ReducedMovie';
export type { Review } from './models/Review';
export type { Season } from './models/Season';
export type { User } from './models/User';
export type { UserMetrics } from './models/UserMetrics';
export type { GetUsers } from './queryStrings/GetUsers';
export type { QueryString } from './queryStrings/Querystring';

/**
 * Enums
 */
export { EDocType } from './enums/EDocType';
export { EMimeType } from './enums/EMimeTypes';
export { EAddReview, EReview, EUpdateReview } from './enums/EReview';
export { ERoles } from './enums/ERoles';
export { ESchemasIds } from './enums/ESchemasIds';

/**
 * Schemas
 */
import type { FastifySchema } from 'fastify';
import { Error } from '../schemas/Error';
import { GETRefresh, POSTLogin, POSTRegister } from './schemas/controller.auth';
import { GETMovies, GETRandomMoviePosters, POSTMovies, PUTMovies } from './schemas/controller.movies';
import { PUTReviews } from './schemas/controller.reviews';

export const schemas = [
    POSTLogin,
    POSTRegister,
    GETRefresh,
    GETMovies,
    GETRandomMoviePosters,
    POSTMovies,
    PUTMovies,
    PUTReviews,
    Error,
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
