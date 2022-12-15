import TestServer from './TestServer';
import { ROUTES_AUTH } from './routes_auth';

const Server = new TestServer();

beforeAll(async () => {
  await Server.start();

  // Create test users
  Server.ressources.admins.push(await Server.createUser('admin'));
  Server.ressources.users.push(await Server.createUser('user'));
});

afterAll(async () => {
  Server.ressources.admins.forEach(async a => await a.delete());
  Server.ressources.users.forEach(async u => await u.delete());
  await Server.stop();
});

ROUTES_AUTH(Server);
