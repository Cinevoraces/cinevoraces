import type { Database } from '../../src/types/Database';
import Fastify from 'fastify';
import plugin from 'fastify-plugin';
import qs from 'qs';
import App from '../../src/app';
import pgClient from './pgClient';
import parseOptions from '../../src/utils/parseOptions';
import { faker } from '@faker-js/faker';
import { comparePassword, hashPassword } from '../../src/utils/bcryptHandler';
import { ressourcesCreator } from './createRessource';
import expectedObjects from './expectedObjects';

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
    slots: [] as Array<{ slot: Database.proposition_slot, delete: ()=>void }>,
    movies: [] as Array<{ movie: Database.movie, delete: ()=>void }>,
  };

  beforeAll(async () => {
    void app.register(plugin(App));
    await app.ready();
    await pgClient.connect();
    res.users.push(await ressourcesCreator.user({ role: 'admin' }));
    res.users.push(await ressourcesCreator.user());
    res.users.push(await ressourcesCreator.user());
    res.slots.push(await ressourcesCreator.slot());
    res.movies.push(await ressourcesCreator.movie({ user_id: 1 }, true));
  });

  afterAll(async () => {
    res.users.forEach(async (u) => await u.delete());
    res.slots.forEach(async (s) => await s.delete());
    res.movies.forEach(async (m) => await m.delete());
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
