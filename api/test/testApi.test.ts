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
import { ENDPOINTS_METRICS } from './tests_routes/Metrics';
import { ENDPOINTS_MOVIES } from './tests_routes/Movies';
import { ENDPOINTS_REVIEWS } from './tests_routes/Reviews';
import { ENDPOINTS_SLOTS } from './tests_routes/Slots';
import { ENDPOINTS_USERS } from './tests_routes/Users';
import { ENDPOINTS_SEASONS } from './tests_routes/Seasons';
import { SECURITY_SANITIZER } from './security_tests/sanitizer';

// Create App instance
const app = Fastify({
  querystringParser: (str) => qs.parse(str, parseOptions),
});
// Prepare ressources
const password = { comparePassword, hashPassword, default: 'password1234' };
const res = {
  users: [] as Array<{ user: Database.user; delete: () => void }>,
  slots: [] as Array<{ slot: Database.proposition_slot; delete: () => void }>,
  movies: [] as Array<{ movie: Database.movie; delete: () => void }>,
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
  res.movies.push(
    await ressourcesCreator.movie({ user_id: res.users[2].user.id }, false)
  );
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
ENDPOINTS_METRICS(server);
ENDPOINTS_SLOTS(server);
ENDPOINTS_MOVIES(server);
ENDPOINTS_REVIEWS(server);
ENDPOINTS_USERS(server);
ENDPOINTS_SEASONS(server);
SECURITY_SANITIZER(server);
