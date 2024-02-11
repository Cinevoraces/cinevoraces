import type { ERoles } from '@src/types';
import fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify';
import qs from 'qs';
import { Migration } from '../Migration';
import type { DependenciesOpts } from './types';
import addSchemas from './utils/addSchemas';
import dbConnector from './utils/dbConnector';
import { envCheck } from './utils/envCheck';
import payloadSanitizer from './utils/payloadSanitizer';

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
    private isDev: boolean = process.env.NODE_ENV === 'development';

    constructor({ dependenciesOpts, parserOpts, ...serverCfg }: ServerOpts) {
        this.serverOpts = serverCfg;
        this.dependenciesOpts = dependenciesOpts;
        this.parserOpts = parserOpts;
    }

    /**
     * Initialize the server with all dependencies.
     */
    public async init() {
        this.fastify = fastify({ ...this.serverOpts, querystringParser: this.querystringParser });
        // Register schemas
        for (const s of [
            await import('@src/schemas').then(s => s.Error),
            await import('@src/schemas').then(s => s.Episode),
            await import('@src/schemas').then(s => s.Metrics),
            await import('@src/schemas').then(s => s.GlobalMetrics),
            await import('@src/schemas').then(s => s.Review),
            await import('@src/schemas').then(s => s.PublicUser),
            await import('@src/schemas').then(s => s.PrivateUser),
            await import('@src/schemas').then(s => s.Movie),
            await import('@src/schemas').then(s => s.ReducedMovie),
            await import('@src/schemas').then(s => s.Season),
        ])
            this.fastify.addSchema(s);

        // Register utils
        await this.fastify.register(addSchemas);

        // Dependencies injection
        await this.fastify.register(dbConnector, this.dependenciesOpts['pg']);
        await this.fastify.register(payloadSanitizer);
        await this.fastify.register(import('@fastify/rate-limit'), this.dependenciesOpts['@fastify/rate-limit']);
        await this.fastify.register(import('@fastify/cookie'), this.dependenciesOpts['@fastify/cookie']);
        await this.fastify.register(import('@fastify/cors'), this.dependenciesOpts['@fastify/cors']);
        await this.fastify.register(import('@fastify/jwt'), this.dependenciesOpts['@fastify/jwt']);
        await this.fastify.register(import('@fastify/multipart'), this.dependenciesOpts['@fastify/multipart']);
        await this.fastify.register(import('@fastify/static'), this.dependenciesOpts['@fastify/static']);
        await this.fastify.register(import('@fastify/swagger'), this.dependenciesOpts['@fastify/swagger']);
        await this.fastify.register(import('@fastify/swagger-ui'), this.dependenciesOpts['@fastify/swagger-ui']);

        // Register controllers
        for (const controller of [
            await import('@src/controllers').then(c => c.adminController),
            await import('@src/controllers').then(c => c.authController),
            await import('@src/controllers').then(c => c.episodesController),
            await import('@src/controllers').then(c => c.metricsController),
            await import('@src/controllers').then(c => c.moviesController),
            await import('@src/controllers').then(c => c.publicController),
            await import('@src/controllers').then(c => c.seasonsController),
            await import('@src/controllers').then(c => c.reviewsController),
            await import('@src/controllers').then(c => c.usersController),
        ])
            await this.fastify.register(controller);
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
    public envCheck = () => envCheck();

    /**
     * Apply all pending migrations.
     * @throws {Error} If one or more migrations failed to apply.
     */
    public applyMigrations = async () => {
        const migrations = Migration.getMigrations(this.fastify.postgres);
        const errorMsgs: string[] = [];
        console.log('Applying migrations...');

        for (const migration of migrations) await migration.apply();

        if (migrations.every(m => m.error === undefined)) {
            const successCount = migrations.filter(m => !m.skiped).length;
            successCount > 0
                ? console.log(`${successCount} migrations applied successfully.`)
                : console.log('No migrations to apply.');
            return;
        }

        for (const migration of migrations) {
            if (migration.error) {
                errorMsgs.push(migration.error);
                continue;
            }
            await migration.rollback();
        }

        throw new Error(errorMsgs.join('\n'));
    };

    private querystringParser = (str: string) => qs.parse(str, this.parserOpts);
}

declare module '@fastify/jwt' {
    interface VerifyOptions {
        onlyCookie: boolean;
    }
    interface FastifyJWT {
        user: {
            id?: number;
            pseudo?: string;
            mail?: string;
            role?: ERoles;
            document_group_id?: number;
            previous_review?: {
                comment?: string;
                rating?: number;
                bookmarked?: boolean;
                viewed?: boolean;
                liked?: boolean;
            };
        };
    }
}
