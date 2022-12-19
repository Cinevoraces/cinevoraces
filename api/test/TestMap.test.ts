import TestServer from './TestServer';
import { ROUTES_AUTH } from './routes_auth';
import { ROUTES_METRICS } from './routes_metrics';
import { ROUTES_MOVIES } from './routes_movies';
import { ROUTES_REVIEWS } from './routes_reviews';
import { ROUTES_SEASONS } from './routes_seasons';
import { ROUTES_SLOTS } from './routes_slots';
import { ROUTES_USERS } from './routes_users';

const Server = new TestServer();

beforeAll(async () => {
  await Server.start();

  // Create test users
  Server.ressources.admins.push(await Server.createUser('admin'));
  Server.ressources.users.push(await Server.createUser('user'));
  Server.ressources.users.push(await Server.createUser('user'));
  Server.ressources.slots.push(await Server.createSlot());
});

afterAll(async () => {
  Server.ressources.admins.forEach(async a => await a.delete());
  Server.ressources.users.forEach(async u => await u.delete());
  Server.ressources.slots.forEach(async s => await s.delete());
  await Server.stop();
});

ROUTES_AUTH(Server);
// ROUTES_METRICS(Server);
// ROUTES_MOVIES(Server);
// ROUTES_REVIEWS(Server);
// ROUTES_SEASONS(Server);
// ROUTES_SLOTS(Server);
// ROUTES_USERS(Server);
