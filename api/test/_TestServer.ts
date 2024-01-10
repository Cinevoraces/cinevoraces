import Fastify from 'fastify';
import type { PoolClient } from 'pg';
import { Pool } from 'pg';
import qs from 'qs';
import controllers from '../src/controllers/_index';
import hooks from '../src/hooks/_index';
import schemas from '../src/models/schemas/_index';
import services from '../src/services/_index';
import parseOptions from '../src/utils/parseOptions';

enum ECrudMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
enum EEndpoints {
    REGISTER = '/register',
    LOGIN = '/login',
    REFRESH = '/refresh',
    REVIEWS = '/reviews',
    METRICS = '/metrics',
    MOVIES = '/movies',
    SEASONS = '/seasons',
    EPISODES = '/episodes',
    USERS = '/users',
    USERS_AVATAR = '/users/avatar',
    BOOK_EPISODE = '/episodes/book',
    ADMIN = '/admin',
    ADMIN_USERS = '/admin/users',
    ADMIN_PUBLISH = '/admin/movies/publish',
    ADMIN_MOVIES = '/admin/movies',
    ADMIN_REVIEWS = '/admin/reviews',
    ADMIN_UNBOOK_EPISODE = '/admin/episodes/unbook',
    ADMIN_SEASONS = '/admin/seasons',
}

export default class TestServer {
    public fastify;
    public pool: Pool;
    public client: PoolClient;

    constructor() {
        this.fastify = Fastify({
            querystringParser: str => qs.parse(str, parseOptions),
        });
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
        });

        schemas.forEach(s => this.fastify.addSchema(s));
        services.forEach(s => this.fastify.register(s));
        hooks.forEach(h => this.fastify.register(h));
        controllers.forEach(({ c, opts }) => this.fastify.register(c, opts));
    }

    // SERVER METHODS
    public async start() {
        await this.fastify.ready();
    }
    public async stop() {
        this.fastify.close();
    }

    // TEST METHODS
    public generateRandomString() {
        return Math.random().toString(36).substring(2, 15);
    }
    public generateRandomEmail() {
        return `${this.generateRandomString()}@${this.generateRandomString()}.com`;
    }
    public generateRandomDate() {
        return new Date(new Date().getTime() - Math.random() * 100000000000).toISOString();
    }

    // API CALLS METHODS
    public async RequestRegister(payload: { pseudo: string; mail: string; password: string }) {
        const req = await this.fastify.inject({
            method: ECrudMethods.POST,
            url: EEndpoints.REGISTER,
            payload,
        });
        const statusCode = req.statusCode;
        const res = await req.json();
        return { res, statusCode };
    }
    async RequestLogin(payload: { pseudo?: string; mail?: string; password: string }) {
        const req = await this.fastify.inject({
            method: ECrudMethods.POST,
            url: EEndpoints.LOGIN,
            payload,
        });
        const statusCode = req.statusCode;
        const res = await req.json();
        const tokens = { refreshToken: '', accessToken: '' };

        if (statusCode === 200) {
            tokens.refreshToken =
                (req.cookies[0] as Record<string, string>).name +
                '=' +
                (req.cookies[0] as Record<string, string>).value;
            tokens.accessToken = await res.token;
        }

        return { res, statusCode, tokens };
    }
    public async RequestRefresh(refreshToken: string) {
        const req = await this.fastify.inject({
            method: ECrudMethods.GET,
            url: EEndpoints.REFRESH,
            headers: {
                cookie: refreshToken,
            },
        });
        const res = await req.json();
        const statusCode = req.statusCode;

        return { res, statusCode };
    }
    public async RequestMetrics() {
        const req = await this.fastify.inject({
            method: ECrudMethods.GET,
            url: EEndpoints.METRICS,
        });
        const res = await req.json();
        const statusCode = req.statusCode;

        return { res, statusCode };
    }
    public async RequestMovies(query = '', token?: string) {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const req = await this.fastify.inject({
            headers,
            method: ECrudMethods.GET,
            url: EEndpoints.MOVIES,
            query,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestReviewMovie(
        payload: {
            rating?: number;
            comment?: string;
            bookmarked?: boolean;
            viewed?: boolean;
            liked?: boolean;
        },
        movieId: number,
        token: string,
    ) {
        const req = await this.fastify.inject({
            headers: { Authorization: `Bearer ${token}` },
            method: ECrudMethods.PUT,
            url: EEndpoints.REVIEWS + `/${movieId}`,
            payload,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestProposeMovie(
        token: string,
        payload?: {
            french_title?: string;
            original_title?: string;
            poster_url?: string;
            directors?: string[];
            release_date?: string;
            runtime?: number;
            casting?: string[];
            presentation?: string;
            movie_genres?: string[];
            movie_languages?: string[];
            movie_countries?: string[];
            episode_id?: number;
        },
    ) {
        const req = await this.fastify.inject({
            method: ECrudMethods.POST,
            url: EEndpoints.MOVIES,
            headers: { Authorization: `Bearer ${token}` },
            payload: {
                french_title: this.generateRandomString(),
                original_title: this.generateRandomString(),
                poster_url: this.generateRandomString(),
                directors: [this.generateRandomString()],
                release_date: this.generateRandomDate(),
                runtime: 150,
                casting: [this.generateRandomString()],
                presentation: this.generateRandomString(),
                movie_genres: ['TEST_GENRE'],
                movie_languages: ['TEST_LANGUAGE'],
                movie_countries: ['TEST_COUNTRY'],
                episode_id: -1,
                ...payload,
            },
            // generate a random string
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    // FIXME: pgClient no longer exists in request
    // public async RequestUpdateMovieProposal(
    //   token: string,
    //   presentation: string,
    //   SQLQuery: {
    //     release_date: string;
    //     french_title: string;
    //     original_title: string;
    //   }
    // ) {
    //   const movieId = await this.fastify.pgClient.query({
    //     text: ` SELECT id FROM movie WHERE
    //             release_date = $1 AND french_title = $2 AND original_title = $3`,
    //     values: [SQLQuery.release_date, SQLQuery.french_title, SQLQuery.original_title],
    //   });
    //   const req = await this.fastify.inject({
    //     method: ECrudMethods.PUT,
    //     url: EEndpoints.MOVIES,
    //     headers: { Authorization: `Bearer ${token}` },
    //     payload: {
    //       movie_id: movieId.rows[0].id,
    //       presentation,
    //     },
    //   });

    //   const res = await req.json();
    //   const statusCode = req.statusCode;
    //   return { res, statusCode };
    // }
    public async RequestSeasons() {
        const req = await this.fastify.inject({
            method: ECrudMethods.GET,
            url: EEndpoints.SEASONS,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestEpisodes(token: string) {
        const req = await this.fastify.inject({
            headers: { Authorization: `Bearer ${token}` },
            method: ECrudMethods.GET,
            url: EEndpoints.EPISODES,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestBookEpisode(token: string, episodeId: number) {
        const req = await this.fastify.inject({
            headers: { Authorization: `Bearer ${token}` },
            method: ECrudMethods.PUT,
            url: EEndpoints.BOOK_EPISODE + `/${episodeId}`,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestUnbookEpisode(token: string, episodeId: number, payload: { password: string }) {
        const req = await this.fastify.inject({
            headers: { Authorization: `Bearer ${token}` },
            method: ECrudMethods.PUT,
            url: EEndpoints.ADMIN_UNBOOK_EPISODE + `/${episodeId}`,
            payload,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestGetUsers(query = '') {
        const req = await this.fastify.inject({
            method: ECrudMethods.GET,
            url: EEndpoints.USERS,
            query,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestUpdateUser(
        token: string,
        payload: {
            update_user: {
                pseudo?: string;
                mail?: string;
                password?: string;
            };
            password: string;
        },
    ) {
        const req = await this.fastify.inject({
            method: ECrudMethods.PUT,
            url: EEndpoints.USERS,
            headers: { Authorization: `Bearer ${token}` },
            payload,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    // FIXME: pgClient no longer exists in request
    // public async RequestAdminDeleteUser(
    //   token: string,
    //   payload: { password: string },
    //   userPseudo: string,
    // ) {
    //   const { rows: user } = await this.fastify.pgClient.query({
    //     text: ' SELECT id FROM "user" WHERE pseudo = $1',
    //     values: [userPseudo],
    //   });

    //   const req = await this.fastify.inject({
    //     method: ECrudMethods.DELETE,
    //     url: EEndpoints.ADMIN_USERS + `/${user[0].id}`,
    //     headers: { Authorization: `Bearer ${token}` },
    //     payload,
    //   });

    //   const res = await req.json();
    //   const statusCode = req.statusCode;
    //   return { res, statusCode };
    // }
    // public async RequestAdminPublishMovie(
    //   token: string,
    //   payload: {
    //     password: string;
    //   },
    //   SQLQuery: {
    //     release_date: string;
    //     french_title: string;
    //     original_title: string;
    //   }
    // ) {
    //   const movieId = await this.fastify.pgClient.query({
    //     text: ` SELECT id FROM movie WHERE
    //             release_date = $1 AND french_title = $2 AND original_title = $3`,
    //     values: [SQLQuery.release_date, SQLQuery.french_title, SQLQuery.original_title],
    //   });
    //   const req = await this.fastify.inject({
    //     method: ECrudMethods.PUT,
    //     url: EEndpoints.ADMIN_PUBLISH + `/${movieId.rows[0].id}`,
    //     headers: { Authorization: `Bearer ${token}` },
    //     payload,
    //   });

    //   const res = await req.json();
    //   const statusCode = req.statusCode;
    //   return { res, statusCode };
    // }
    // public async RequestAdminDeleteMovie(
    //   token: string,
    //   payload: {
    //     password: string;
    //   },
    //   SQLQuery: {
    //     release_date: string;
    //     french_title: string;
    //     original_title: string;
    //   }
    // ) {
    //   const movieId = await this.fastify.pgClient.query({
    //     text: ` SELECT id FROM movie WHERE
    //             release_date = $1 AND french_title = $2 AND original_title = $3`,
    //     values: [SQLQuery.release_date, SQLQuery.french_title, SQLQuery.original_title],
    //   });
    //   const req = await this.fastify.inject({
    //     method: ECrudMethods.DELETE,
    //     url: EEndpoints.ADMIN_MOVIES + `/${movieId.rows[0].id}`,
    //     headers: { Authorization: `Bearer ${token}` },
    //     payload,
    //   });

    //   const res = await req.json();
    //   const statusCode = req.statusCode;
    //   return { res, statusCode };
    // }
    public async RequestAdminDeleteReview(
        token: string,
        payload: {
            password: string;
        },
        urlParams: string,
    ) {
        const req = await this.fastify.inject({
            method: ECrudMethods.DELETE,
            url: EEndpoints.ADMIN_REVIEWS + urlParams,
            headers: { Authorization: `Bearer ${token}` },
            payload,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestAdminGetReviews(token: string, query: string) {
        const req = await this.fastify.inject({
            method: ECrudMethods.GET,
            url: EEndpoints.ADMIN_REVIEWS,
            headers: { Authorization: `Bearer ${token}` },
            query,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
    public async RequestAdminCreateSeason(
        token: string,
        payload: {
            year: number;
            season_number: number;
        },
    ) {
        const req = await this.fastify.inject({
            method: ECrudMethods.POST,
            url: EEndpoints.ADMIN_SEASONS,
            headers: { Authorization: `Bearer ${token}` },
            payload,
        });

        const res = await req.json();
        const statusCode = req.statusCode;
        return { res, statusCode };
    }
}
