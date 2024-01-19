import type { QueryString } from '@src/types';
import type { QueryResult } from 'pg';

export type CreateSeasonFn = (year: number, seasonNumber: number) => Promise<void>;
export type DeleteUserFn = (id: number) => Promise<QueryResult>;
export type DeleteMovieFn = (id: number) => Promise<QueryResult>;
export type DeleteCommentFn = (userId: number, movieId: number) => Promise<QueryResult>;
export type GetReviewsAsAdminFn = (query: QueryString) => Promise<{ rowCount: number; rows: Array<unknown> }>;
export type PublishMovieFn = (id: number) => Promise<void>;

export interface POSTSeasonRequest {
    Body: { year: number; season_number: number };
}

export interface PUTMovieAsAdminRequest {
    Params: { id: number };
}

export interface DELETEMovieAsAdminRequest {
    Params: { id: number };
}
