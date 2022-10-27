import type { Database } from '../../src/types/Database';
import Fastify from 'fastify';
import plugin from 'fastify-plugin';
import qs from 'qs';
import App from '../../src/app';
import pgClient from './pgClient';
import parseOptions from '../../src/utils/parseOptions';
import { faker } from '@faker-js/faker';
import { comparePassword, hashPassword } from '../../src/utils/bcryptHandler';
import { ressourcesCreator } from './ressourceCreator/createRessource';
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

  const password = {
    default: 'password1234',
    comparePassword,
    hashPassword,
  };

  // Prepare ressources
  const res = {
    users: [] as Array<{ user: Database.user, delete: ()=>void }>,
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
    res.users.push(await ressourcesCreator.user({ role: 'admin' }));
    res.users.push(await ressourcesCreator.user());
  });

  afterAll(async () => {
    res.users.forEach(async (u) => await u.delete());
    app.close();
  });

  return { 
    app, 
    res,
    pgClient,
    expectedObjects, 
    password,
    faker,
  };
}
