import bcryptPlugin from './bcrypt';
import cookie from './fastifyCookie';
import cors from './fastifyCors';
import envCheck from './envCheck';
import jwt from './fastifyJwt';
import pgClient from './pgClient';
import swagger from './swagger';

/**
 * **Plugins _index**
 * @description
 * Plugins are functions that are binded to the Fastify instance.
 * Add any new plugin to this array (order matters!).
 */
export const plugins = [
  envCheck, // Should always be loaded first
  pgClient,
  cookie,
  cors,
  jwt,
  swagger,
  bcryptPlugin,
];
