import fastifyCookie, { type FastifyCookieOptions } from '@fastify/cookie';
import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors';
import fastifyJWT, { type FastifyJWTOptions } from '@fastify/jwt';
import fastifyMultipart, { type FastifyMultipartOptions } from '@fastify/multipart';
import fastifyStatic, { type FastifyStaticOptions } from '@fastify/static';
import type { FastifyServerOptions } from 'fastify';
import fastify from 'fastify';
import type { PoolConfig } from 'pg';
import type qs from 'qs';
import { checkEnv } from './checkEnv';
import dbConnector from './dbConnector';

interface DependenciesOpts {
    '@fastify/cookie'?: FastifyCookieOptions;
    '@fastify/cors'?: FastifyCorsOptions;
    '@fastify/jwt'?: FastifyJWTOptions;
    '@fastify/multipart'?: FastifyMultipartOptions;
    '@fastify/static'?: FastifyStaticOptions;
    pg?: PoolConfig;
}

export interface ServerConfig extends Omit<FastifyServerOptions, 'querystringParser'> {
    dependenciesOpts: DependenciesOpts;
    parserOpts?: qs.IParseOptions;
}

/**
 * **createServer()**
 *
 * Creates a Fastify server and registers all dependencies with the given options.
 * @see *server/config.ts* for more information on the configuration options.
 */
export const createServer = ({ dependenciesOpts, ...serverOpts }: ServerConfig) => {
    try {
        checkEnv();
        const server = fastify(serverOpts);

        // Inject dependencies
        server.register(dbConnector, dependenciesOpts['pg']);
        server.register(fastifyCookie, dependenciesOpts['@fastify/cookie']);
        server.register(fastifyCors, dependenciesOpts['@fastify/cors']);
        server.register(fastifyJWT, dependenciesOpts['@fastify/jwt']);
        server.register(fastifyMultipart, dependenciesOpts['@fastify/multipart']);
        server.register(fastifyStatic, dependenciesOpts['@fastify/static']);

        return server;
    } catch (err) {
        console.error('server.ts: Error while building server');
        console.error(err);
        process.exit(1);
    }
};
