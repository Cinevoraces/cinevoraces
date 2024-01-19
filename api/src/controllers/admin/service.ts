import DatabaseService from '@src/services/databaseService';
import type { PoolClient } from 'pg';
import type {
    CreateSeasonFn,
    DeleteCommentFn,
    DeleteMovieFn,
    DeleteUserFn,
    GetReviewsAsAdminFn,
    PublishMovieFn,
} from './types';

export default async (postgres: PoolClient) => {
    const dbService = new DatabaseService(postgres);

    /**
     * Create a new season and it's episodes.
     */
    const createSeason: CreateSeasonFn = async (year, seasonNumber) => {
        const day = Date.firstDayOfYear('monday', year);

        await postgres.query({
            text: 'SELECT new_season($1, $2, $3);',
            values: [seasonNumber, year, day],
        });
    };

    /**
     * Delete one user.
     *
     */
    const deleteUser: DeleteUserFn = async id =>
        await postgres.query({
            text: ' DELETE FROM "user" WHERE id=$1;',
            values: [id],
        });

    /**
     * Delete a comment.
     */
    const deleteComment: DeleteCommentFn = async (userId, movieId) =>
        await postgres.query({
            text: ` UPDATE review SET comment = null 
                  WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId],
        });

    /**
     * Delete one movie.
     */
    const deleteMovie: DeleteMovieFn = async id =>
        await postgres.query({
            text: 'DELETE FROM movie WHERE id = $1;',
            values: [id],
        });

    /**
     * Get reviews
     */
    const getReviews: GetReviewsAsAdminFn = async query => {
        const enumerator = ['author_id', 'movie_id'];
        const { where, limit, sort } = query;
        let values = [] as Array<unknown>,
            WHERE = { query: '', count: 0, values: [] as Array<unknown> },
            ORDERBY = '',
            LIMIT = '';

        if (where) {
            WHERE = dbService.reduceWhere(where, 'AND', enumerator);
            values = WHERE.values as Array<unknown>;
        }
        if (sort === 'asc' || sort === 'desc') {
            ORDERBY = `ORDER BY id ${sort}`;
        }
        if (typeof limit === 'number' && limit > 0) {
            LIMIT = `LIMIT ${limit}`;
        }

        const { rowCount, rows } = await postgres.query({
            text: ` SELECT * FROM reviewview
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT};`,
            values,
        });
        return { rowCount, rows };
    };

    /**
     * Publish a movie proposal.
     */
    const publishMovie: PublishMovieFn = async id => {
        await postgres.query({
            text: 'UPDATE movie SET is_published = true WHERE id = $1;',
            values: [id],
        });
    };

    return {
        createSeason,
        deleteComment,
        deleteMovie,
        deleteUser,
        getReviews,
        publishMovie,
    };
};
