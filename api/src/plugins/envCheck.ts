import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';

/**
 * **Environment variables check**
 * @description
 * This plugin checks if all the environment variables are set.
 * If not, it throws an error that stops the server.
 */
const envCheck: FastifyPluginCallback = async (fastify, opts, done) => {
  const enumerator = [
    'COOKIE_SECRET',
    'JWT_SECRET',
    'PASS_REGEXP',
    'POSTGRES_USER',
    'POSTGRES_DB',
    'POSTGRES_PASSWORD',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
  ];
  enumerator.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`Missing environment variable: ${env}`);
    }
  });

  done();
};

export default plugin(envCheck);
