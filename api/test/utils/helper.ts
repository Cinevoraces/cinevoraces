import Fastify from 'fastify';
import plugin from 'fastify-plugin';
import qs from 'qs';
import App from '../../src/app';
import pgClient from './pgClient';
import parseOptions from '../../src/utils/parseOptions';
import expectedObjects from './expectedObjects';

// import createMovie from './ressourceCreator/createMovie';
// import createReview from './ressourceCreator/createReview';
// import createSlot from './ressourceCreator/createSlot';
// import createUser from './ressourceCreator/createUser';

export function build() {
  // Create App instance
  const app = Fastify({
    querystringParser: (str) => qs.parse(str, parseOptions),
  });

  // Prepare ressources
  const res = {
    default: {
      password: 'password1234',
    }
    // createUser,
    // createMovie,
    // createReview,
    // createSlot,
    // users: [] as Awaited<ReturnType<typeof createUser>>[],
    // movies: [] as Awaited<ReturnType<typeof createMovie>>[],
    // reviews: [] as Awaited<ReturnType<typeof createReview>>[],
    // slots: [] as Awaited<ReturnType<typeof createSlot>>[],
  };

  beforeAll(async () => {
    void app.register(plugin(App));
    await app.ready();
    await pgClient.connect();
  });

  afterAll(async () => {
    await pgClient.end();
    app.close();
  });

  return { 
    app, 
    res,
    pgClient,
    expectedObjects, 
  };
}
