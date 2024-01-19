import fastifyCookie, { type FastifyCookieOptions } from '@fastify/cookie';
import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors';
import fastifyJWT, { type FastifyJWTOptions } from '@fastify/jwt';
import fastifyMultipart, { type FastifyMultipartOptions } from '@fastify/multipart';
import fastifyStatic, { type FastifyStaticOptions } from '@fastify/static';
import FastifySwagger, { type SwaggerOptions } from '@fastify/swagger';
import FastifySwaggerUi, { type FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import controllers, {
    adminController,
    episodesController,
    metricsController,
    seasonsController,
} from '@src/controllers';
import hooks from '@src/hooks';
import {
    Episode as EpisodeSchema,
    Error as ErrorSchema,
    GlobalMetrics as GlobalMetricsSchema,
    Metrics as MetricsSchema,
    Movie as MovieSchema,
    PrivateUser as PrivateUserSchema,
    PublicUser as PublicUserSchema,
    ReducedMovie as ReducedMovieSchema,
    Review as ReviewSchema,
    Season as SeasonSchema,
} from '@src/schemas';
import services from '@src/services';
import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastify from 'fastify';
import type { PoolConfig } from 'pg';
import qs from 'qs';
import addSchemas from './utils/addSchemas';
import dbConnector from './utils/dbConnector';

interface DependenciesOpts {
    '@fastify/cookie'?: FastifyCookieOptions;
    '@fastify/cors'?: FastifyCorsOptions;
    '@fastify/jwt'?: FastifyJWTOptions;
    '@fastify/multipart'?: FastifyMultipartOptions;
    '@fastify/static'?: FastifyStaticOptions;
    '@fastify/swagger'?: SwaggerOptions;
    '@fastify/swagger-ui'?: FastifySwaggerUiOptions;
    pg?: PoolConfig;
}

interface ErrorCatcherOpts {
    logInDb?: boolean;
}

export interface ServerOpts extends Omit<FastifyServerOptions, 'querystringParser'> {
    dependenciesOpts: DependenciesOpts;
    parserOpts?: qs.IParseOptions;
}

export default class Server {
    public fastify: FastifyInstance;

    private serverOpts: FastifyServerOptions;
    private dependenciesOpts: DependenciesOpts;
    private parserOpts?: qs.IParseOptions;

    constructor({ dependenciesOpts, parserOpts, ...serverCfg }: ServerOpts) {
        this.serverOpts = serverCfg;
        this.dependenciesOpts = dependenciesOpts;
        this.parserOpts = parserOpts;
    }

    /**
     * Initialize the server with all dependencies.
     */
    public init() {
        this.fastify = fastify({ ...this.serverOpts, querystringParser: this.querystringParser });
        // Register schemas
        [
            ErrorSchema,
            EpisodeSchema,
            MetricsSchema,
            GlobalMetricsSchema,
            ReviewSchema,
            PublicUserSchema,
            PrivateUserSchema,
            MovieSchema,
            ReducedMovieSchema,
            SeasonSchema,
        ].forEach(s => this.fastify.addSchema(s));
        this.fastify.register(addSchemas);
        // Register dependencies
        this.fastify.register(dbConnector, this.dependenciesOpts['pg']);
        this.fastify.register(fastifyCookie, this.dependenciesOpts['@fastify/cookie']);
        this.fastify.register(fastifyCors, this.dependenciesOpts['@fastify/cors']);
        this.fastify.register(fastifyJWT, this.dependenciesOpts['@fastify/jwt']);
        this.fastify.register(fastifyMultipart, this.dependenciesOpts['@fastify/multipart']);
        this.fastify.register(fastifyStatic, this.dependenciesOpts['@fastify/static']);
        this.fastify.register(FastifySwagger, this.dependenciesOpts['@fastify/swagger']);
        this.fastify.register(FastifySwaggerUi, this.dependenciesOpts['@fastify/swagger-ui']);
        // Legacy register
        services.forEach(s => this.fastify.register(s));
        hooks.forEach(h => this.fastify.register(h));
        controllers.forEach(({ c, opts }) => this.fastify.register(c, opts));
        // Register controllers
        this.fastify.register(adminController);
        this.fastify.register(episodesController);
        this.fastify.register(metricsController);
        this.fastify.register(seasonsController);
    }

    /**
     * Start the server.
     * @param port The port to listen on. (default: env.API_PORT | 3005)
     */
    public start(port?: number) {
        this.fastify.listen({
            port: port || Number(process.env.API_PORT) || 3005,
            host: '0.0.0.0',
        });
    }

    /**
     * Initialize the global error catcher.
     * @param logInDb Whether or not to log the error in the database.
     */
    public initErrorCatcher({ logInDb }: ErrorCatcherOpts = {}) {
        this.fastify.setErrorHandler(function (error, request, reply) {
            this.log.error(error);
            if (logInDb) {
                console.log('Not implemented yet.');
            }
            reply.status(error.statusCode ?? 500).send(error);
        });
    }

    /**
     * Check if all required environment variables are set.
     * @throws {Error} If one or more required environment variables are missing.
     */
    public envCheck() {
        const missing = [
            'CLOUDINARY_URL',
            'PASS_REGEXP',
            'JWT_SECRET',
            'COOKIE_SECRET',
            'POSTGRES_USER',
            'POSTGRES_DB',
            'POSTGRES_PASSWORD',
            'POSTGRES_HOST',
            'POSTGRES_PORT',
        ].filter(env => !process.env[env]);

        if (!missing.length) return;

        console.log('Missing environment variables:');
        missing.forEach(env => console.log(`- ${env}`));
        console.log();
        throw new Error('You are missing one or more required environment variables.');
    }

    private querystringParser(str: string) {
        return qs.parse(str, this.parserOpts);
    }
}
