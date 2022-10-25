import type { FastifyPluginCallback } from 'fastify';
import { Client } from 'pg';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
    pgClient: Client;
  }
  interface FastifyInstance {
    pgClient: Client;
  }
}

/**
 * **PostgreSQL client**
 * @description
 * This plugin registers a PostgreSQL client.
 * It adds a pgClient property to the request object.
 */
const pgClient: FastifyPluginCallback = async (
  fastify,
  opts,
  done
) => {
  if (fastify.pgClient) {
    return fastify.log.warn('pg client already registered');
  }

  const pgClient = new Client({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
  });
  await pgClient.connect();

  fastify
    .decorate('pg', pgClient)
    .decorateRequest('pg', { getter: () => fastify.pgClient })
    .addHook('onClose', async (fastify, done) => {
      await fastify.pgClient.end();
      done();
    });

  done();
};

export default plugin(pgClient);
