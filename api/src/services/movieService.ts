import { HTTPClient } from '@src/classes';
import {
    EDocType,
    type Episode,
    type Movie,
    type PostMovie,
    type PutMovie,
    type QueryString,
    type Season,
} from '@src/types';
import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import type { PoolClient } from 'pg';
import DatabaseService from './databaseService';

/**
 * @description MovieService contains movies and SQL query related methods
 * related to movies routes.
 */
class MovieService extends DatabaseService {
    constructor(client: PoolClient) {
        super(client);
    }

    /**
     * @description Get movies using query parameters.
     * @param {object} query object containing queries parameters
     * @returns Array of movies.
     */
    public async getMoviesByQuery(query: QueryString): Promise<{ rowCount: number; rows: Array<Movie> }> {
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

        const { rowCount, rows } = await this.requestDatabase({
            text: ` SELECT id, author_id, season_number, is_published, 
						french_title, original_title, document_group_id, publishing_date
            ${SELECT ? `,${SELECT}` : ''}
            FROM movieview
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT}
    ;`,
            values,
        });

        return { rowCount, rows };
    }

    /**
     * @description Randomly get a number of movie posters.
     * @param {number} count Count of requested posters.
     * @returns Array of movie posters.
     */
    public async getRandomMoviePosters(count: number): Promise<Array<{ id: number; french_title: string }>> {
        const { rowCount, rows } = await this.requestDatabase({
            text: 'SELECT id, french_title FROM movie WHERE is_published = true ORDER BY random() LIMIT $1;',
            values: [count],
        });
        return rowCount ? rows : [];
    }

    /**
     * @description Create a movie.
     * @param {object} payload Object containing movie's values.
     * @returns movie's id.
     */
    public async insertNewMovie(payload: PostMovie): Promise<number> {
        const { rows } = await this.requestDatabase({
            text: 'SELECT new_movie($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) as movie_id;',
            values: Object.values(payload),
        });

        return rows[0].movie_id;
    }

    /**
     * @description Update movie.
     * @param {object} payload Object containing movie's id and new values.
     */
    public async updateUnpublishedMovie(payload: PutMovie): Promise<void> {
        const { rows } = await this.requestDatabase({
            text: 'UPDATE movie SET presentation = $1 WHERE id = $2;',
            values: [payload.presentation, payload.movie_id],
        });
        return rows[0];
    }

    /**
     * @description Update is_publish movie state.
     * @param {number} id movie's id
     */
    public async publishMovie(id: number): Promise<void> {
        await this.requestDatabase({
            text: 'UPDATE movie SET is_published = true WHERE id = $1;',
            values: [id],
        });
    }

    /**
     * @description Delete one movie.
     * @param {number} id movie's id
     */
    public async deleteMovie(id: number): Promise<void> {
        await this.requestDatabase({
            text: 'DELETE FROM movie WHERE id = $1;',
            values: [id],
        });
    }

    /**
     * @description Get all seasons objects.
     * @returns Array of seasons.
     */
    public async getSeasons(): Promise<{
        rowCount: number;
        rows: Array<unknown>;
    }> {
        const { rowCount, rows } = await this.requestDatabase({
            text: 'SELECT * FROM seasonView;',
            values: [],
        });
        return { rowCount, rows };
    }

    /**
     * @description Get one season object by season number.
     * @param {number} seasonNumber season's number
     * @returns Season object.
     */
    public async getSeasonByNumber(seasonNumber: number): Promise<Season> {
        const { rowCount, rows } = await this.requestDatabase({
            text: 'SELECT * FROM season WHERE number = $1;',
            values: [seasonNumber],
        });

        return rowCount ? rows[0] : null;
    }

    /**
     * @description Create a new season and it's episodes.
     * @param {number} year season's year
     * @param {number} seasonNumber season's number
     * @param {Date} firstMondayOfTheYear season's first monday
     */
    public async insertNewSeason(year: number, seasonNumber: number, firstMondayOfTheYear: Date): Promise<void> {
        await this.requestDatabase({
            text: 'SELECT new_season($1, $2, $3);',
            values: [seasonNumber, year, firstMondayOfTheYear],
        });
    }

    /**
     * @description Get the next 5 available episodes within 1 month. Consider current episode if available too.
     * @returns Array of episodes.
     */
    public async getAvailableEpisodes(): Promise<{
        rowCount: number;
        rows: Episode[];
    }> {
        const { rowCount, rows } = await this.requestDatabase({
            text: ` SELECT ep.id, ep.season_number, ep.episode_number, ep.publishing_date
                FROM "episode" ep
                  LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv 
                    ON mv.episode_id = ep.id
                  WHERE mv.id IS NULL
                AND ep.publishing_date >= (NOW() - interval '6 days')
                AND ep.publishing_date < (NOW() + interval '1 month')
              ORDER BY ep.publishing_date ASC
              LIMIT 5;`,
        });
        return { rowCount, rows };
    }

    /**
     * @description Check for one movie using id.
     * @param {number} id movie's id
     * @returns Boolean.
     */
    public async checkMovieExistanceById(id: number): Promise<boolean> {
        const { rowCount } = await this.requestDatabase({
            text: 'SELECT id FROM movie WHERE id = $1;',
            values: [id],
        });
        return rowCount ? true : false;
    }

    /**
     * @description Find a movie using it's name
     * @param {string} originalTitle Movie's original title
     * @param {string} frenchTitle Movie's french title
     * @returns Boolean.
     */
    public async checkMovieExistanceByName(originalTitle: string, frenchTitle: string): Promise<boolean> {
        const { rowCount } = await this.requestDatabase({
            text: ` SELECT french_title, original_title
              FROM movie
              WHERE original_title = $1
              AND french_title = $2;`,
            values: [originalTitle, frenchTitle],
        });
        return rowCount ? true : false;
    }

    /**
     * @description Check if an episode is available.
     * @param {number} id episode's id
     * @returns Boolean.
     */
    public async checkEpisodeAvailability(id: number): Promise<boolean> {
        const { rowCount } = await this.requestDatabase({
            text: ` SELECT ep.id FROM "episode" ep 
              LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv ON mv.episode_id = ep.id
              WHERE ep.id = $1 AND mv.id IS NULL;`,
            values: [id],
        });
        return rowCount ? true : false;
    }

    /**
     * @description Check if a movie is published.
     * @param {number} movieId movie's id
     * @param {number} userId user's id (optional)
     * @returns Boolean.
     */
    public async isMoviePublished(movieId: number, userId?: number): Promise<boolean> {
        const { rowCount } = await this.requestDatabase({
            text: ` SELECT * FROM movie
              WHERE is_published = false
              AND id = $1
              ${userId ? 'AND user_id = $2' : ''};`,
            values: userId ? [movieId, userId] : [movieId],
        });
        return rowCount ? true : false;
    }

    /**
     * @description Check if a user already has a pending proposition.
     * @param {number} id user's id (optional)
     * @returns Boolean.
     */
    public async doesUserHasPendingProposition(id: number): Promise<boolean> {
        const { rowCount } = await this.requestDatabase({
            text: ` SELECT user_id
              FROM movie
              WHERE is_published = false AND user_id = $1;`,
            values: [id],
        });
        return rowCount ? true : false;
    }

    /**
     * @description Upload a movie poster using an external url.
     * @param {object} movieId - movie's id.
     * @param {object} url - The file to upload.
     */
    public async uploadMoviePoster(movieId: number, url: string): Promise<void> {
        const filename = `${EDocType.POSTER}${movieId}`;

        const httpClient = new HTTPClient();
        const { contentType } = await httpClient.downloadFile(url, { filename, destination: 'public' });

        await this.requestDatabase({
            text: ` INSERT INTO "document" ("document_group_id", "filename", "content_type", "type")
              VALUES (
                (SELECT document_group_id FROM movie WHERE movie.id = $1), 
                $2, $3, $4);`,
            values: [movieId, filename, contentType, EDocType.POSTER],
        });
    }
}

// Decorate FastifyInstance with MovieService
export type TMovieService = InstanceType<typeof MovieService>;
export default plugin((async (fastify, opts, done) => {
    // Check if service is already registered
    if (fastify.hasDecorator('_movieService')) return fastify.log.warn('movieService already registered');

    const MovieServiceInstance = new MovieService(fastify.postgres);
    fastify.decorate('_movieService', { getter: () => MovieServiceInstance });
    done();
}) as FastifyPluginCallback);
