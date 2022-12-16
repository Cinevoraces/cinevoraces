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
  ADMIN = '/admin',
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
          mail: expect.any(String),
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
    payload: { pseudo: string; password: string }
  ) {
    const req = await this.fastify.inject({
      method: ECrudMethods.POST,
      url: EEndpoints.LOGIN,
      payload
    });
    const statusCode = req.statusCode;
    const res = await req.json();
    const tokens = {
      refreshToken:
        (req.cookies[0] as Record<string, string>).name + '='
        + (req.cookies[0] as Record<string, string>).value,
      accessToken: await res.token
    };
    
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
    // TODO
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
  async createSlot(slot: DBSlot) {
    const s = {
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
    return {
      ...slot,
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
