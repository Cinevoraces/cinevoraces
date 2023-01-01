import TestServer from './TestServer';
import { Roles } from '../src/types/_index';
import { ROUTES_AUTH } from './routes_auth';
import { ROUTES_METRICS } from './routes_metrics';
import { ROUTES_MOVIES } from './routes_movies';
import { ROUTES_REVIEWS } from './routes_reviews';
import { ROUTES_SEASONS } from './routes_seasons';
import { ROUTES_EPISODES } from './routes_episodes';
import { ROUTES_USERS } from './routes_users';
import { FILE_UPLOADS } from './file_uploads';

const Server = new TestServer();

beforeAll(async () => {
  await Server.start();

  // Create test users
  Server.ressources.admins.push(await Server.createUser(Roles.ADMIN));
  Server.ressources.users.push(await Server.createUser(Roles.USER));
  Server.ressources.users.push(await Server.createUser(Roles.USER));
  Server.ressources.episodes.push(await Server.createEpisode());
});

afterAll(async () => {
  Server.ressources.admins.forEach(async a => await a.delete());
  Server.ressources.users.forEach(async u => await u.delete());
  Server.ressources.episodes.forEach(async e => await e.delete());
  await Server.stop();
});

// ROUTES_AUTH(Server);
// ROUTES_METRICS(Server);
// ROUTES_MOVIES(Server);
// ROUTES_REVIEWS(Server);
// ROUTES_SEASONS(Server);
// ROUTES_EPISODES(Server);
// ROUTES_USERS(Server);
FILE_UPLOADS(Server);
