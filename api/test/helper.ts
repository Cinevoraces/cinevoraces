import Fastify from 'fastify';
import plugin from 'fastify-plugin';
import qs from 'qs';
import App from '../src/app';
import parseOptions from '../src/utils/parseOptions';
import createMovie from './utils/ressourceCreator/createMovie';
import createReview from './utils/ressourceCreator/createReview';
import createSlot from './utils/ressourceCreator/createSlot';
import createUser from './utils/ressourceCreator/createUser';

export function build() {
  // Create App instance
  const app = Fastify({
    querystringParser: (str) => qs.parse(str, parseOptions),
  });

  // Prepare ressources
  const res = {
    password: 'password1234',
    createUser,
    createMovie,
    createReview,
    createSlot,
    users: [] as Awaited<ReturnType<typeof createUser>>[],
    movies: [] as Awaited<ReturnType<typeof createMovie>>[],
    reviews: [] as Awaited<ReturnType<typeof createReview>>[],
    slots: [] as Awaited<ReturnType<typeof createSlot>>[],
  };

  beforeAll(async () => {
    void app.register(plugin(App));
    await app.ready();
  });

  afterAll(() => app.close());

  return { app, res };
}
