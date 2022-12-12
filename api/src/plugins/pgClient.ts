import type { FastifyPluginCallback } from 'fastify';
import { Pool } from 'pg';
import plugin from 'fastify-plugin';

/**
 * **PostgreSQL client**
 * @description
 * This plugin registers a PostgreSQL client.
 * It adds a pgClient property to the request object.
 */
const pgClient: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.pgClient) return fastify.log.warn('pg client already registered');

  const pgClient = new Pool({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
  });
  await pgClient.connect();

  fastify
    .decorate('pgClient', pgClient)
    .decorateRequest('pgClient', { getter: () => fastify.pgClient });
  done();
};

export default plugin(pgClient);
