import plugin from 'fastify-plugin';
import type { PoolConfig } from 'pg';
import { Pool } from 'pg';

/**
 * @description PostgreSQL connector for Fastify server.
 * @see https://github.com/brianc/node-postgres
 * @see https://node-postgres.com/
 */
export default plugin(async (fastify, opts: PoolConfig) => {
    const pgPool = new Pool(opts);

    const postgres = await pgPool.connect();

    fastify.decorate('postgres', postgres);
});
