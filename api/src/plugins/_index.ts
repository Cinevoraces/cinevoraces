import type { FastifyPluginCallback } from 'fastify';
import fastifyMultipart from './fastifyMultipart';
import fastifyStatic from './fastifyStatic';
import fastifySwagger from './fastifySwagger';
import fastifyCookie from './fastifyCookie';
import fastifyCors from './fastifyCors';
import fastifyJwt from './fastifyJwt';
import postgresPool from './postgresPool';

/**
 * **Plugins Registration _index**
 * Add any new plugin to this array.
 */
export default [
    fastifyMultipart,
    fastifyStatic,
    fastifySwagger,
    fastifyCookie,
    fastifyCors,
    fastifyJwt,
    postgresPool,
] as Array<FastifyPluginCallback>;
