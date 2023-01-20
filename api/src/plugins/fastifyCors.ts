import type { FastifyPluginCallback } from 'fastify';
import FastifyCors from '@fastify/cors';
import plugin from 'fastify-plugin';

/**
 * @package @fastify/cors
 * @description Fastify cors configuration.
 * @see https://github.com/fastify/fastify-cors
 */
export default plugin((async (fastify, opts, done) => {
  fastify.register(FastifyCors, {
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    ...opts,
  });
  
  done();
}) as FastifyPluginCallback);
