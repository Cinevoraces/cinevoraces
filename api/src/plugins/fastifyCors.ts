import type { FastifyPluginCallback } from 'fastify';
import cors from '@fastify/cors';
import plugin from 'fastify-plugin';

/**
 * **Fastify CORS**
 * @description
 * This plugin registers the CORS plugin used for Cross Origin Requests authorization
 */
const fastifyCors: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.register(cors, {
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  done();
};

export default plugin(fastifyCors);
