import envCheck from './envCheck';
import pgClient from './pgClient';
import jwt from './fastifyJwt';
import swagger from './swagger';
import cookie from './fastifyCookie';
import cors from './fastifyCors';

/**
 * **Plugins _index**
 * @description
 * Plugins are functions that are binded to the Fastify instance.
 * Add any new plugin to this array.
 */
export const plugins = [
  envCheck, // Should always be loaded first
  pgClient,
  cookie,
  cors,
  jwt,
  swagger,
];
