import Fastify from 'fastify';
import plugin from 'fastify-plugin';
import qs from 'qs';
import { faker } from '@faker-js/faker';
import App from '../src/app';
import parseOptions from '../src/utils/parseOptions';
import type {
  proposition_slot as DBSlot,
  movie as DBMovie
} from '../src/types/_index';

interface RessourcesEtity {
  delete: ()=>Promise<void>;
}
interface User extends RessourcesEtity {
  pseudo: string;
  mail: string;
  password: {
    clear: string;
    encrypted: string;
  };
}
interface Slot extends RessourcesEtity {
  id: number;
  is_booked: boolean;
  season_number: number;
  episode: number;
  publishing_date: string;
}
interface Movie extends RessourcesEtity {
  french_title: string;
  original_title: string;
  poster_url: string;
  directors: string[];
  release_date: string;
  runtime: number;
  casting: string[];
  presentation: string;
  publishing_date: string;
  user_id: number;
  season_id: number;
  movie_genres: string[];
  movie_languages: string[];
  movie_countries: string[];
}

enum ECrudMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
enum EEndpoints {
  REGISTER = '/register',
  LOGIN = '/login',
  REFRESH = '/refresh',
  REVIEWS = '/reviews',
  METRICS = '/metrics',
  MOVIES = '/movies',
  SEASONS = '/seasons',
  SLOTS = '/slots',
  USERS = '/users',
  BOOK_SLOT = '/slots/book',
  ADMIN = '/admin',
  ADMIN_USERS = '/admin/users',
  ADMIN_PUBLISH = '/admin/movies/publish',
  ADMIN_MOVIES = '/admin/movies',
  ADMIN_REVIEWS = '/admin/reviews',
  ADMIN_UNBOOK_SLOT = '/admin/slots/unbook',
  ADMIN_SEASONS = '/admin/seasons',
}

export default class TestServer {
  fastify;
  faker;
  expected;
  ressources;

  constructor() {
    this.fastify = Fastify({
      querystringParser: (str) => qs.parse(str, parseOptions)
    });
    this.fastify.register(plugin(App));
    this.faker = faker;
    this.expected = {
      apiError: expect.objectContaining({
        message: expect.any(String),
        statusCode: expect.any(Number),
      }),
      loginResponse: expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
          pseudo: expect.any(String),
          role: expect.any(String),
          avatar_url: expect.any(String),
        }),
        token: expect.any(String),
        response: expect.any(String)
      }),
      refreshToken: expect.objectContaining({
        name: 'refresh_token',
        value: expect.any(String)
      }),
      metrics: expect.objectContaining({
        seasons_count: expect.any(Number),
        movies_count: expect.any(Number),
        countries_count: expect.any(Number),
      }),
      movie: expect.objectContaining({
        id: expect.any(Number),
        author_id: expect.any(Number),
        season_number: expect.any(Number),
        is_published: expect.any(Boolean),
        french_title: expect.any(String),
        original_title: expect.any(String),
        poster_url: expect.any(String),
        publishing_date: expect.any(String),
      }),
      movieFullObject: expect.objectContaining({
        id: expect.any(Number),
        author_id: expect.any(Number),
        season_number: expect.any(Number),
        is_published: expect.any(Boolean),
        french_title: expect.any(String),
        original_title: expect.any(String),
        poster_url: expect.any(String),
        publishing_date: expect.any(String),
        casting: expect.any(Array),
        directors: expect.any(Array),
        runtime: expect.any(Number),
        release_date: expect.any(String),
        genres: expect.any(Array),
        countries: expect.any(Array),
        languages: expect.any(Array),
        presentation: expect.any(Object),
        metrics: expect.any(Object),
        comments: expect.any(Array),
      }),
      season: expect.objectContaining({
        season_number: expect.any(Number),
        year: expect.any(Number),
        movie_count: expect.any(Number),
      }),
      userWithMoviesReviewsAndMetrics: expect.objectContaining({
        id: expect.any(Number),
        pseudo: expect.any(String),
        mail: expect.any(String),
        avatar_url: expect.any(String),
        role: expect.any(String),
        created_at: expect.anything(),
        propositions: expect.anything(),
        reviews: expect.anything(),
        metrics: expect.anything(),
      }),
    };
    this.ressources = {
      admins: [] as Array<User>,
      users: [] as Array<User>,
      slots: [] as Array<Slot>,
      movies: [] as Array<Movie>,
    };
  }

  // SERVER METHODS
  async start() {
    await this.fastify.ready();
  }
  async stop() {
    this.fastify.close();
  }

  // API CALLS METHODS
  async RequestRegister(
    payload: { pseudo: string; mail: string; password: string }
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.POST,
      url: EEndpoints.REGISTER,
      payload
    });
    const statusCode = req.statusCode;
    const res = await req.json();
    return { res, statusCode };
  }
  async RequestLogin(
    payload: { pseudo?: string; mail?: string; password: string }
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.POST,
      url: EEndpoints.LOGIN,
      payload
    });
    const statusCode = req.statusCode;
    const res = await req.json();
    const tokens = { refreshToken: '', accessToken: '' };

    if (statusCode === 200) {
      tokens.refreshToken = (req.cookies[0] as Record<string, string>).name + '=' + (req.cookies[0] as Record<string, string>).value;
      tokens.accessToken = await res.token;
    }
    
    return { res, statusCode, tokens };
  }
  async RequestRefresh(refreshToken: string) {
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
  async RequestMetrics() {
    const req = await this.fastify.inject({
      method: ECrudMethods.GET,
      url: EEndpoints.METRICS,
    });
    const res = await req.json();
    const statusCode = req.statusCode;
    
    return { res, statusCode };
  }
  async RequestMovies(query = '', token?: string) {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    
    const req = await this.fastify.inject({
      headers,
      method: ECrudMethods.GET,
      url: EEndpoints.MOVIES,
      query
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestReviewMovie(
    payload: { rating?: number; comment?: string, bookmarked?: boolean, viewed?: boolean, liked?: boolean },
    movieId: number,
    token: string
  ) {
    const req = await this.fastify.inject({
      headers: { Authorization: `Bearer ${token}` },
      method: ECrudMethods.PUT,
      url: EEndpoints.REVIEWS + `/${movieId}`,
      payload
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestProposeMovie(
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
      publishing_date?: string;
      user_id?: number;
      season_id?: number;
      movie_genres?: string[];
      movie_languages?: string[];
      movie_countries?: string[]
    }
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.POST,
      url: EEndpoints.MOVIES,
      headers: { Authorization: `Bearer ${token}` },
      payload: {
        french_title: faker.lorem.words(2),
        original_title: faker.lorem.words(2),
        poster_url: faker.image.imageUrl(),
        directors: [faker.name.fullName()],
        release_date: faker.date.past(),
        runtime: 150,
        casting: [faker.name.firstName()],
        presentation: faker.lorem.paragraph(),
        publishing_date: faker.date.past(),
        season_id: 3,
        movie_genres: ['TEST_GENRE'],
        movie_languages: ['TEST_LANGUAGE'],
        movie_countries: ['TEST_COUNTRY'],
        ...payload
      }
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestUpdateMovieProposal(
    token: string,
    presentation: string,
    SQLQuery: {
      release_date: string;
      french_title: string;
      original_title: string;
    }
  ) {
    const movieId = await this.fastify.pgClient.query({
      text: ` SELECT id FROM movie WHERE 
              release_date = $1 AND french_title = $2 AND original_title = $3`,
      values: [SQLQuery.release_date, SQLQuery.french_title, SQLQuery.original_title]
    });
    const req = await this.fastify.inject({
      method: ECrudMethods.PUT,
      url: EEndpoints.MOVIES,
      headers: { Authorization: `Bearer ${token}` },
      payload: {
        movie_id: movieId.rows[0].id,
        presentation
      }
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestSeasons() {
    const req = await this.fastify.inject({
      method: ECrudMethods.GET,
      url: EEndpoints.SEASONS,
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestSlots(
    token: string,
    query: string
  ) {
    const req = await this.fastify.inject({
      headers: { Authorization: `Bearer ${token}` },
      method: ECrudMethods.GET,
      url: EEndpoints.SLOTS,
      query
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestBookSlot(
    token: string,
    slotId: number
  ) {
    const req = await this.fastify.inject({
      headers: { Authorization: `Bearer ${token}` },
      method: ECrudMethods.PUT,
      url: EEndpoints.BOOK_SLOT + `/${slotId}`
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestUnbookSlot(
    token: string,
    slotId: number,
    payload: { password: string }
  ) {
    const req = await this.fastify.inject({
      headers: { Authorization: `Bearer ${token}` },
      method: ECrudMethods.PUT,
      url: EEndpoints.ADMIN_UNBOOK_SLOT + `/${slotId}`,
      payload
    });
    
    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestGetUsers(query = '') {
    const req = await this.fastify.inject({
      method: ECrudMethods.GET,
      url: EEndpoints.USERS,
      query
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestUpdateUser(
    token: string,
    payload: {
      update_user: {
        pseudo?: string,
        mail?: string,
        password?: string,
      },
      password: string
    },
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.PUT,
      url: EEndpoints.USERS,
      headers: { Authorization: `Bearer ${token}` },
      payload
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestAdminDeleteUser(
    token: string,
    payload: { password: string },
    userPseudo: string,
  ) {
    const { rows: user } = await this.fastify.pgClient.query({
      text: ' SELECT id FROM "user" WHERE pseudo = $1',
      values: [userPseudo]
    });

    const req = await this.fastify.inject({
      method: ECrudMethods.DELETE,
      url: EEndpoints.ADMIN_USERS + `/${user[0].id}`,
      headers: { Authorization: `Bearer ${token}` },
      payload
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestAdminPublishMovie(
    token: string,
    payload: {
      password: string;
    },
    SQLQuery: {
      release_date: string;
      french_title: string;
      original_title: string;
    }
  ) {
    const movieId = await this.fastify.pgClient.query({
      text: ` SELECT id FROM movie WHERE
              release_date = $1 AND french_title = $2 AND original_title = $3`,
      values: [SQLQuery.release_date, SQLQuery.french_title, SQLQuery.original_title]
    });
    const req = await this.fastify.inject({
      method: ECrudMethods.PUT,
      url: EEndpoints.ADMIN_PUBLISH + `/${movieId.rows[0].id}`,
      headers: { Authorization: `Bearer ${token}` },
      payload
    });
  
    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestAdminDeleteMovie(
    token: string,
    payload: {
      password: string;
    },
    SQLQuery: {
      release_date: string;
      french_title: string;
      original_title: string;
    }
  ) {
    const movieId = await this.fastify.pgClient.query({
      text: ` SELECT id FROM movie WHERE
              release_date = $1 AND french_title = $2 AND original_title = $3`,
      values: [SQLQuery.release_date, SQLQuery.french_title, SQLQuery.original_title]
    });
    const req = await this.fastify.inject({
      method: ECrudMethods.DELETE,
      url: EEndpoints.ADMIN_MOVIES + `/${movieId.rows[0].id}`,
      headers: { Authorization: `Bearer ${token}` },
      payload
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestAdminDeleteReview(
    token: string,
    payload: {
      password: string;
    },
    urlParams: string
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.DELETE,
      url: EEndpoints.ADMIN_REVIEWS + urlParams,
      headers: { Authorization: `Bearer ${token}` },
      payload
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestAdminGetReviews(
    token: string,
    query: string
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.GET,
      url: EEndpoints.ADMIN_REVIEWS,
      headers: { Authorization: `Bearer ${token}` },
      query
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  async RequestAdminCreateSeason( 
    token: string,
    payload: {
      year: number,
      season_number: number
    }
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.POST,
      url: EEndpoints.ADMIN_SEASONS,
      headers: { Authorization: `Bearer ${token}` },
      payload
    });

    const res = await req.json();
    const statusCode = req.statusCode;
    return { res, statusCode };
  }
  // RESSOURCES METHODS
  async createUser(role = 'user') {
    const user = {
      pseudo: this.faker.internet.userName(),
      mail: this.faker.internet.email(),
      password: await this.generatePassword(),
      role
    };
    await this.fastify.pgClient.query({
      text: ` INSERT INTO "user" (pseudo, mail, password, role)
              VALUES ($1, $2, $3, $4)`,
      values: [
        user.pseudo,
        user.mail,
        user.password.encrypted,
        user.role
      ]
    });
    return {
      ...user,
      delete: async () => {
        await this.fastify.pgClient.query({
          text: 'DELETE FROM "user" WHERE pseudo = $1 AND mail = $2',
          values: [user.pseudo, user.mail]
        });
      }
    };
  }
  async createSlot(slot?: DBSlot) {
    const s = {
      id: -1,
      is_booked: false,
      season_number: 3,
      episode: 1,
      publishing_date: this.faker.date.past().toISOString()
    };
    if (slot) Object.assign(s, slot);

    await this.fastify.pgClient.query({
      text: ` INSERT INTO proposition_slot (is_booked, season_number, episode, publishing_date)
              VALUES ($1, $2, $3, $4)`,
      values: [
        s.is_booked,
        s.season_number,
        s.episode,
        s.publishing_date
      ]
    });
    await this.fastify.pgClient.query({
      text: ` SELECT id FROM proposition_slot WHERE
              season_number = $1 AND episode = $2 AND publishing_date = $3`,
      values: [s.season_number, s.episode, s.publishing_date]
    }).then(r => s.id = r.rows[0].id);
    return {
      ...s,
      delete: async () => {
        await this.fastify.pgClient.query({
          text: ` DELETE FROM proposition_slot 
                  WHERE season_number = $1 
                  AND episode = $2
                  AND publishing_date = $3`,
          values: [s.season_number, s.episode, s.publishing_date]
        });
      }
    };
  }
  async createMovie(movie: DBMovie) {
    const m = {
      french_title: this.faker.lorem.words(3),
      original_title: this.faker.lorem.words(3),
      poster_url: this.faker.image.imageUrl(),
      directors: [this.faker.name.jobTitle()],
      release_date: this.faker.date.past().toISOString(),
      runtime: this.faker.random.numeric(3),
      casting: [this.faker.name.fullName()],
      presentation: this.faker.lorem.paragraph(),
      publishing_date: this.faker.date.past().toISOString(),
      user_id: 1,
      season_id: 1,
      movie_genres: [this.faker.lorem.word()],
      movie_languages: [this.faker.lorem.word()],
      movie_countries: [this.faker.lorem.word()]
    };
    if (movie) Object.assign(m, movie);

    await this.fastify.pgClient.query({
      text: ` INSERT INTO movie (french_title, original_title, poster_url, directors, release_date, runtime, casting, presentation, publishing_date, user_id, season_id)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      values: [
        m.french_title,
        m.original_title,
        m.poster_url,
        m.directors,
        m.release_date,
        m.runtime,
        m.casting,
        m.presentation,
        m.publishing_date,
        m.user_id,
        m.season_id
      ]
    });
    return {
      ...movie,
      delete: async () => {
        await this.fastify.pgClient.query({
          text: ` DELETE FROM movie
                  WHERE french_title = $1
                  AND original_title = $2
                  AND poster_url = $3`,
          values: [m.french_title, m.original_title, m.poster_url]
        });
      }
    };
  }
                  
  // PRIVATE METHODS
  private async generatePassword() {
    const password = this.faker.internet.password();
    return {
      clear: password,
      encrypted: await this.fastify.bcryptHash(password)
    };
  }
}