import type { Review } from '@src/types';
import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import type { PoolClient } from 'pg';
import DatabaseService from './databaseService';

/**
 * @description ReviewService contains reviews and SQL query related methods
 */
class ReviewService extends DatabaseService {
    constructor(client: PoolClient) {
        super(client);
    }

    /**
     * @description Select user's review of a movie (Create the review if none).
     * @param {number} userId user's id
     * @param {number} movieId movie's id
     * @returns Comment and rating values of a review.
     */
    public async getOrCreateMovieReview(userId: number, movieId: number): Promise<{ comment: string; rating: number }> {
        const { rowCount, rows } = await this.requestDatabase({
            text: ` SELECT comment, rating
              FROM review
              WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId],
        });
        if (rowCount) return rows[0];

        await this.requestDatabase({
            text: ' INSERT INTO review (user_id, movie_id) VALUES ($1,$2);',
            values: [userId, movieId],
        });
        return { comment: null, rating: null };
    }

    /**
     * @description Get all user review using it's id.
     * @param {number} userId user's id
     * @returns All user review of one movie.
     */
    public async getReviewsByUserId(userId: number): Promise<{ rowCount: number; rows: Array<Review> }> {
        const { rowCount, rows } = await this.requestDatabase({
            text: ` SELECT movie_id, user_id, bookmarked, liked, viewed, rating
              FROM "review"
              WHERE user_id = $1;`,
            values: [userId],
        });
        return { rowCount, rows };
    }

    /**
     * @description Get one review object.
     * @param {number} userId user's id
     * @param {number} movieId user's id
     * @returns Review object.
     */
    public async getOneReviewByIds(
        userId: number,
        movieId: number,
    ): Promise<{ rowCount: number; rows: Array<unknown> }> {
        const { rowCount, rows } = await this.requestDatabase({
            text: ` SELECT bookmarked, viewed, liked, rating, comment
              FROM "review"
              WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId],
        });
        return { rowCount, rows };
    }

    /**
     * @description Update one review object with only one given value.
     * @param {object} payload object containing update values
     * @param {number} userId user's id
     * @param {number} movieId user's id
     * @returns Review object.
     */
    public async updateReview(
        userId: number,
        movieId: number,
        payload: Record<
            keyof Pick<Review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>,
            boolean | number | string
        >,
    ): Promise<void> {
        const column = Object.keys(payload)[0];
        const value = payload[column as keyof typeof payload];
        await this.requestDatabase({
            text: ` UPDATE "review" SET ${column} = $3, "updated_at" = NOW()
              WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId, value],
        });
    }
}

// Decorate FastifyInstance with ReviewService
export type TReviewService = InstanceType<typeof ReviewService>;
export default plugin((async (fastify, opts, done) => {
    // Check if service is already registered
    if (fastify.hasDecorator('_reviewService')) return fastify.log.warn('reviewService already registered');

    const ReviewServiceInstance = new ReviewService(fastify.postgres);
    fastify.decorate('_reviewService', { getter: () => ReviewServiceInstance });
    done();
}) as FastifyPluginCallback);
