import type { Database } from '../src/types/Database';
import Fastify from 'fastify';
import plugin from 'fastify-plugin';
import qs from 'qs';
import App from '../src/app';
import pgClient from './utils/pgClient';
import parseOptions from '../src/utils/parseOptions';
import { faker } from '@faker-js/faker';
import { comparePassword, hashPassword } from '../src/utils/bcryptHandler';
import { ressourcesCreator } from './utils/createRessource';
import expectedObjects from './utils/expectedObjects';
import { AUTHENTICATION } from './tests_routes/Authentication';
import { METRICS_ENDPOINTS } from './tests_routes/Metrics';
import { MOVIES_ENDPOINTS } from './tests_routes/Movies';
import { REVIEWS_ENDPOINTS } from './tests_routes/Reviews';
import { SLOTS_ENDPOINTS } from './tests_routes/Slots';
import { USERS_ENDPOINTS } from './tests_routes/Users';

// Create App instance
const app = Fastify({ querystringParser: (str) => qs.parse(str, parseOptions) });
// Prepare ressources
const password = { comparePassword, hashPassword, default: 'password1234' };
const res = {
  users: [] as Array<{ user: Database.user, delete: ()=>void }>,
  slots: [] as Array<{ slot: Database.proposition_slot, delete: ()=>void }>,
  movies: [] as Array<{ movie: Database.movie, delete: ()=>void }>,
};

// Before/after all tests
beforeAll(async () => {
  void app.register(plugin(App));
  await app.ready();
  await pgClient.connect();
  res.users.push(await ressourcesCreator.user({ role: 'admin' }));
  res.users.push(await ressourcesCreator.user());
  res.users.push(await ressourcesCreator.user());
  res.slots.push(await ressourcesCreator.slot());
  res.slots.push(await ressourcesCreator.slot());
  res.movies.push(await ressourcesCreator.movie({ user_id: 1 }, true));
  res.movies.push(await ressourcesCreator.movie({ user_id: 2 }, false));
  res.movies.push(await ressourcesCreator.movie({ user_id: 3 }, false));
  res.movies.push(await ressourcesCreator.movie({ user_id: 4 }, false));
  res.movies.push(await ressourcesCreator.movie({ user_id: res.users[2].user.id }, false));
});
afterAll(async () => {
  res.users.forEach(async (u) => await u.delete());
  res.slots.forEach(async (s) => await s.delete());
  res.movies.forEach(async (m) => await m.delete());
  app.close();
});

// Prepare server object
const server = { app, res, pgClient, expectedObjects, password, faker };

// Launch tests (Order matters)
AUTHENTICATION(server);
METRICS_ENDPOINTS(server);
SLOTS_ENDPOINTS(server);
MOVIES_ENDPOINTS(server);
REVIEWS_ENDPOINTS(server);
USERS_ENDPOINTS(server);
