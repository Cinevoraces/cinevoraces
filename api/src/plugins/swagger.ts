import type { FastifyPluginCallback } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import plugin from 'fastify-plugin';

const swagger: FastifyPluginCallback = async (fastify, opts, done) => {
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
        { name: 'Authentication', description: 'Authentication related end-points' },
        { name: 'Users', description: 'Users data related end-points' },
        { name: 'Movies', description: 'Movies data related end-points' },
        { name: 'Metrics', description: 'Metrics data related end-points' },
        { name: 'Propositions', description: 'Movie propositions related end-points' },
      ],
    },
    exposeRoute: true,
  });
  done();
};

export default plugin(swagger);
