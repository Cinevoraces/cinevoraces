import bcryptPlugin from './bcrypt';
import cookie from './fastifyCookie';
import cors from './fastifyCors';
import envCheck from './envCheck';
import jwt from './fastifyJwt';
import pgClient from './pgClient';
import serverError from './serverError';
import swagger from './swagger';
import cloudinaryService from './cloudinary';
import fastifyMultipart from './fastifyMultipart';
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
  serverError,
  swagger,
  bcryptPlugin,
  fastifyMultipart,
  cloudinaryService,
];
