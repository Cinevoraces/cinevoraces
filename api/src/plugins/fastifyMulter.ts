import type { FastifyPluginCallback } from 'fastify';
import multer from 'fastify-multer';
import plugin from 'fastify-plugin';

/**
 * **Fastify Multer**
 * @description
 * This plugin is used to handle file uploads.
 */
const fastifyMulter: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.multer)
    return fastify.log.warn('Fastify/multer already registered');

  const file: { name: string, location: string, path: string } = {
    name: null,
    location: null,
    path: null,
  };

  fastify.register(multer.contentParser);
  fastify
    .decorate('multer', {})
    .decorateRequest('file', file);

  done();
};

export default plugin(fastifyMulter);
