import type { FastifyPluginCallback } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import plugin from 'fastify-plugin';

/**
 * **Swagger**
 * @description
 * This plugin registers the swagger documentation.
 */
const swagger: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.swagger) return fastify.log.warn('Swagger already registered');

  fastify.register(fastifySwagger, {
    routePrefix: '/dev-docs',
    swagger: {
      info: {
        title: 'Cinévoraces API',
        description: 'API Documentation',
        version: '2',
      },
      host: 'localhost',
      schemes: ['http'],
      tags: [
        { name: 'Admin', description: 'Admin-only end-points' },
        {
          name: 'Authentication',
          description: 'Authentication related end-points',
        },
        { name: 'Metrics', description: 'Metrics data related end-points' },
        { name: 'Movies', description: 'Movies data related end-points' },
        { name: 'Reviews', description: 'Review objects related end-points' },
        { name: 'Slots', description: 'Movie propositions related end-points' },
        { name: 'Users', description: 'Users data related end-points' },
      ],
    },
    exposeRoute: true,
  });

  done();
};

export default plugin(swagger);
