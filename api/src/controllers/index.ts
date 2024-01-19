import type { FastifyPluginCallback } from 'fastify';
import authController from './authController';
import moviesController from './moviesController';
import publicController from './publicController';
import reviewsController from './reviewsController';
import usersController from './usersController';

/**
 * **Controllers Registration _index**
 * Add any new controller to this array.
 */
export default [
    { c: publicController, opts: { prefix: '/public' } },
    { c: authController },
    { c: moviesController },
    { c: reviewsController },
    { c: usersController },
] as Array<{ c: FastifyPluginCallback; opts: Record<never, never> }>;

export { default as adminController } from './admin/controller';
export { default as episodesController } from './episodes/controller';
export { default as metricsController } from './metrics/controller';
export { default as seasonsController } from './seasons/controller';
