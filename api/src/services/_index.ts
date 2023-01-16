import type { FastifyPluginCallback } from 'fastify';
import fileService from './fileService';
import errorService from './errorService';
import dateService from './dateService';
import authService from './authService';
import movieService from './movieService';
import reviewService from './reviewService';
import UserService from './UserService';

/**
 * **Services Registration _index**
 * Add any new service to this array (order matters!).
 */
export default [
  fileService,
  errorService,
  dateService,
  authService,
  movieService,
  reviewService,
  UserService,
] as Array<FastifyPluginCallback>;
