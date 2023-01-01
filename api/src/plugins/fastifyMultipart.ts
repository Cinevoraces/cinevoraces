import type { FastifyPluginCallback } from 'fastify';
import FastifyMultipart from '@fastify/multipart';
import plugin from 'fastify-plugin';

/**
 * **Fastify Multipart**
 * @description
 * This plugin is used to parse multipart/form-data requests.
 */
const fastifyMultipart: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.multipartErrors) 
    return fastify.log.warn('Fastify/multipart already registered');
  
  fastify.register(FastifyMultipart);

  done();
};

export default plugin(fastifyMultipart);
