import type { FastifyPluginCallback } from 'fastify';
import UserService from './UserService';
import authService from './authService';
import errorService from './errorService';
import fileService from './fileService';
import movieService from './movieService';
import reviewService from './reviewService';

/**
 * **Services Registration _index**
 * Add any new service to this array (order matters!).
 */
export default [
    fileService,
    errorService,
    authService,
    movieService,
    reviewService,
    UserService,
] as Array<FastifyPluginCallback>;
