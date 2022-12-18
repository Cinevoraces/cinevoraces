import type { FastifyPluginCallback } from 'fastify';
import { EEnvValues, EEnvKeys } from '../types/_index';
import plugin from 'fastify-plugin';

/**
 * **Environment variables check**
 * @description
 * This plugin checks if all the environment variables are set.
 * If not, it throws an error that stops the server.
 */
const envCheck: FastifyPluginCallback = async (fastify, opts, done) => {
  EEnvValues.forEach((env) => {
    if (!process.env[EEnvKeys[env]])
      throw new Error(`Missing environment variable: ${env}`);
  });

  done();
};

export default plugin(envCheck);
