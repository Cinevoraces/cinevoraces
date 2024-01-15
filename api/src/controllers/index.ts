import type { FastifyPluginCallback } from 'fastify';
import publicController from './publicController';
import authController from './authController';
import episodesController from './episodesController';
import metricsController from './metricsController';
import moviesController from './moviesController';
import reviewsController from './reviewsController';
import seasonsController from './seasonsController';
import usersController from './usersController';

/**
 * **Controllers Registration _index**
 * Add any new controller to this array.
 */
export default [
    { c: publicController, opts: { prefix: '/public' } },
    { c: authController },
    { c: episodesController },
    { c: metricsController },
    { c: moviesController },
    { c: reviewsController },
    { c: seasonsController },
    { c: usersController },
] as Array<{ c: FastifyPluginCallback; opts: Record<never, never> }>;
