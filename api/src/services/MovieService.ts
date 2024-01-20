import { HTTPClient } from '@src/classes';
import type { POSTMovieRequest, PUTMovieRequest } from '@src/controllers/movies/types';
import type { Movie, QueryString } from '@src/types';
import { EDocType } from '@src/types';
import type { QueryResult } from 'pg';
import Service from './Service';

type CheckEpisodeAvailabilityFn = (id: number) => Promise<boolean>;
type CheckMovieExistanceByIdFn = (id: number) => Promise<boolean>;
type CheckMovieExistanceByNameFn = (originalTitle: string, frenchTitle: string) => Promise<boolean>;
type CreateMovieFn = (payload: POSTMovieRequest['Body']) => Promise<number>;
type DeleteMovieFn = (id: number) => Promise<QueryResult>;
type DoesUserHasPendingPropositionFn = (id: number) => Promise<boolean>;
type GetMoviesByQueryFn = (query: QueryString) => Promise<{ rowCount: number; rows: Array<Movie> }>;
type GetRandomMoviePostersFn = (count: number) => Promise<Array<{ id: number; french_title: string }>>;
type IsMoviePublishedFn = (movieId: number, userId?: number) => Promise<boolean>;
type PublishMovieFn = (id: number) => Promise<void>;
type UpdateUnpublishedMovieFn = (payload: PUTMovieRequest['Body']) => Promise<void>;
type UploadMoviePosterFn = (movieId: number, url: string) => Promise<void>;

export default class MovieService extends Service {
    /**
     * Get movies using query parameters.
     */
    getMoviesByQuery: GetMoviesByQueryFn = async (query: QueryString) => {
        const enums = {
            where: ['id', 'author_id', 'season_number', 'is_published', 'french_title'],
            select: [
                'casting',
                'directors',
                'runtime',
                'episode_number',
                'release_date',
                'genres',
                'countries',
                'languages',
                'presentation',
                'metrics',
                'comments',
            ],
        };
        const { select, where, limit, sort } = query;
        let values = [] as Array<unknown>,
            SELECT: string = undefined,
            WHERE = { query: '', count: 0, values: [] as Array<unknown> },
            ORDERBY = '',
            LIMIT = '';

        // Build SELECT query
        if (select) {
            SELECT = this.reduceSelect(select, enums.select);
        }
        // Build WHERE query
        if (where) {
            WHERE = this.reduceWhere(where, 'AND', enums.where);
            values = WHERE.values as Array<unknown>;
        }
        // Build ORDERBY query
        if (sort === 'asc' || sort === 'desc') {
            ORDERBY = `ORDER BY publishing_date ${sort}`;
        }
        // Build LIMIT query
        if (typeof limit === 'number' && limit > 0) {
            LIMIT = `LIMIT ${limit}`;
        }

        return await this.postgres.query({
            text: ` 
                SELECT id, author_id, season_number, is_published, french_title, original_title, document_group_id, publishing_date
                ${SELECT ? `,${SELECT}` : ''}
                FROM movieview
                ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
                ${ORDERBY}
                ${LIMIT}
            ;`,
            values,
        });
    };

    /**
     * Randomly get a number of movie posters.
     */
    getRandomMoviePosters: GetRandomMoviePostersFn = async count => {
        const { rows, rowCount } = await this.postgres.query({
            text: 'SELECT id, french_title FROM movie WHERE is_published = true ORDER BY random() LIMIT $1;',
            values: [count],
        });
        return rowCount ? rows : [];
    };

    /**
     * Create a movie.
     */
    createMovie: CreateMovieFn = async payload => {
        const { rowCount } = await this.postgres.query({
            text: 'SELECT french_title, original_title FROM movie WHERE original_title = $1 AND french_title = $2;',
            values: [payload.original_title, payload.french_title],
        });
        if (rowCount) throw new ServerError(409, 'DUPLICATE_MOVIE', 'Le film sélectionné a déjà été proposé.');

        const { rows } = await this.postgres.query({
            text: 'SELECT new_movie($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) as movie_id;',
            values: Object.values(payload),
        });
        return rows[0].movie_id;
    };

    /**
     * Update movie.
     */
    updateUnpublishedMovie: UpdateUnpublishedMovieFn = async ({ presentation, movie_id }) => {
        const { rows } = await this.postgres.query({
            text: 'UPDATE movie SET presentation = $1 WHERE id = $2;',
            values: [presentation, movie_id],
        });
        return rows[0];
    };

    /**
     * Delete one movie.
     */
    deleteMovie: DeleteMovieFn = async id =>
        await this.postgres.query({
            text: 'DELETE FROM movie WHERE id = $1;',
            values: [id],
        });

    /**
     * Check for one movie using id.
     */
    checkMovieExistanceById: CheckMovieExistanceByIdFn = async id => {
        const { rowCount } = await this.postgres.query({
            text: 'SELECT id FROM movie WHERE id = $1;',
            values: [id],
        });
        return rowCount ? true : false;
    };

    /**
     * Find a movie using it's name
     */
    checkMovieExistanceByName: CheckMovieExistanceByNameFn = async (originalTitle, frenchTitle) => {
        const { rowCount } = await this.postgres.query({
            text: 'SELECT french_title, original_title FROM movie WHERE original_title = $1 AND french_title = $2;',
            values: [originalTitle, frenchTitle],
        });
        return rowCount ? true : false;
    };

    /**
     * Check if an episode is available.
     */
    checkEpisodeAvailability: CheckEpisodeAvailabilityFn = async id => {
        const { rowCount } = await this.postgres.query({
            text: ` 
                SELECT ep.id FROM "episode" ep 
                LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv ON mv.episode_id = ep.id
                WHERE ep.id = $1 AND mv.id IS NULL;`,
            values: [id],
        });
        return rowCount ? true : false;
    };

    /**
     * Check if a movie is published.
     */
    isMoviePublished: IsMoviePublishedFn = async (movieId, userId) => {
        const { rowCount } = await this.postgres.query({
            text: `
                SELECT * FROM movie WHERE is_published = false AND id = $1 
                ${userId ? 'AND user_id = $2' : ''};`,
            values: userId ? [movieId, userId] : [movieId],
        });
        return rowCount ? true : false;
    };

    /**
     * Check if a user already has a pending proposition.
     */
    doesUserHasPendingProposition: DoesUserHasPendingPropositionFn = async id => {
        const { rowCount } = await this.postgres.query({
            text: 'SELECT user_id FROM movie WHERE is_published = false AND user_id = $1;',
            values: [id],
        });
        return rowCount ? true : false;
    };

    /**
     * Publish a movie proposal.
     */
    publishMovie: PublishMovieFn = async id => {
        await this.postgres.query({
            text: 'UPDATE movie SET is_published = true WHERE id = $1 AND is_published = false;',
            values: [id],
        });
    };

    /**
     * Upload a movie poster using an external url.
     */
    uploadMoviePoster: UploadMoviePosterFn = async (movieId, url) => {
        const filename = `${EDocType.POSTER}${movieId}`;

        const httpClient = new HTTPClient();
        const { contentType } = await httpClient.downloadFile(url, { filename, destination: 'public' });

        await this.postgres.query({
            text: ` 
                INSERT INTO "document" ("document_group_id", "filename", "content_type", "type")
                VALUES ((SELECT document_group_id FROM movie WHERE movie.id = $1), $2, $3, $4);`,
            values: [movieId, filename, contentType, EDocType.POSTER],
        });
    };
}
