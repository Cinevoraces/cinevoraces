import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import { Pool } from 'pg';

/**
 * @package pg
 * @description PostgreSQL pool object.
 * @see https://github.com/brianc/node-postgres
 * @see https://node-postgres.com/
 */
export default plugin((async (fastify, opts, done) => {
    // Check if plugin is already registered
    if (fastify.hasDecorator('_postgres')) return fastify.log.warn('_postgres already registered');

    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
    });
    const client = await pool.connect();

    fastify.decorate('_postgres', {
        pool,
        client,
    });

    done();
}) as FastifyPluginCallback);
