import type { PUTReviewsBody } from '@src/controllers/reviews/types';
import type { QueryString, Review } from '@src/types';
import type { QueryResult } from 'pg';
import Service from './Service';

type BuildReviewResponseFn = (body: PUTReviewsBody['Body'], payload: { comment: string; rating: number }) => string;
type DeleteCommentFn = (userId: number, movieId: number) => Promise<QueryResult>;
type GetOrCreateMovieReviewFn = (userId: number, movieId: number) => Promise<{ comment: string; rating: number }>;
type GetReviewsFn = (query: QueryString) => Promise<{ rowCount: number; rows: Array<unknown> }>;
type UpdateReviewFn = (
    userId: number,
    movieId: number,
    payload: Record<
        keyof Pick<Review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>,
        boolean | number | string
    >,
) => Promise<Review>;

export default class ReviewService extends Service {
    /**
     * Get reviews
     */
    getReviews: GetReviewsFn = async query => {
        const enumerator = ['author_id', 'movie_id'];
        const { where, limit, sort } = query;
        let values = [] as Array<unknown>,
            WHERE = { query: '', count: 0, values: [] as Array<unknown> },
            ORDERBY = '',
            LIMIT = '';

        if (where) {
            WHERE = this.reduceWhere(where, 'AND', enumerator);
            values = WHERE.values as Array<unknown>;
        }
        if (sort === 'asc' || sort === 'desc') {
            ORDERBY = `ORDER BY id ${sort}`;
        }
        if (typeof limit === 'number' && limit > 0) {
            LIMIT = `LIMIT ${limit}`;
        }

        const { rowCount, rows } = await this.postgres.query({
            text: ` SELECT * FROM reviewview
                ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
                ${ORDERBY}
                ${LIMIT};`,
            values,
        });
        return { rowCount, rows };
    };

    /**
     * Select user's review of a movie and create the review if none exists.
     */
    getOrCreateMovieReview: GetOrCreateMovieReviewFn = async (userId, movieId) => {
        const { rowCount, rows } = await this.postgres.query({
            text: 'SELECT comment, rating FROM review WHERE user_id=$1 AND movie_id=$2;',
            values: [userId, movieId],
        });
        if (rowCount) return rows[0];

        await this.postgres.query({
            text: 'INSERT INTO review (user_id, movie_id) VALUES ($1,$2);',
            values: [userId, movieId],
        });
        return { comment: null, rating: null };
    };

    /**
     * Update one review object with only one given value.
     */
    updateReview: UpdateReviewFn = async (userId, movieId, payload) => {
        const column = Object.keys(payload)[0];
        const value = payload[column as keyof typeof payload];
        await this.postgres.query({
            text: `
                UPDATE "review" SET ${column} = $3, updated_at = NOW()
                WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId, value],
        });
        const { rows } = await this.postgres.query({
            text: ` 
                SELECT bookmarked, viewed, liked, rating, comment
                FROM "review" WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId],
        });
        return rows[0];
    };

    /**
     * Delete a comment.
     */
    deleteComment: DeleteCommentFn = async (userId, movieId) =>
        await this.postgres.query({
            text: ` UPDATE review SET comment = null 
                  WHERE user_id=$1 AND movie_id=$2;`,
            values: [userId, movieId],
        });

    /**
     * Build response object using old and new review object.
     */
    buildCreateReviewResponse: BuildReviewResponseFn = (body, { comment, rating }) => {
        const key = Object.keys(body)[0] as EReview;
        if (key === EReview.COMMENT && comment) {
            return EUpdateReview.COMMENT;
        } else if (key === EReview.COMMENT) {
            return EAddReview.COMMENT;
        } else if (key === EReview.RATING && rating) {
            return EUpdateReview.RATING;
        } else if (key === EReview.RATING) {
            return EAddReview.RATING;
        } else if (body[key]) {
            return EAddReview[key.toUpperCase() as keyof typeof EAddReview];
        } else {
            return EUpdateReview[key.toUpperCase() as keyof typeof EUpdateReview];
        }
    };
}

enum EReview {
    BOOKMARKED = 'bookmarked',
    VIEWED = 'viewed',
    LIKED = 'liked',
    RATING = 'rating',
    COMMENT = 'comment',
}

export enum EAddReview {
    BOOKMARKED = 'Film ajouté à ma liste.',
    VIEWED = 'Film marqué comme vu.',
    LIKED = 'Film marqué comme aimé.',
    RATING = 'Film noté.',
    COMMENT = 'Commentaire ajouté.',
}

export enum EUpdateReview {
    BOOKMARKED = 'Film retiré de ma liste.',
    VIEWED = 'Film marqué comme non vu.',
    LIKED = 'Film marqué comme non aimé.',
    RATING = 'Note mise à jour.',
    COMMENT = 'Commentaire mis à jour.',
}
