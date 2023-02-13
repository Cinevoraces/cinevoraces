import type { FastifyPluginCallback } from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';
import plugin from 'fastify-plugin';

/**
 * @package @fastify/swagger
 * @description Fastify plugin for generating Swagger documentation.
 * @see https://github.com/fastify/fastify-swagger
 * @see https://github.com/fastify/fastify-swagger-ui
 */
export default plugin((async (fastify, opts, done) => {
  // Check if plugin is already registered
  if (fastify.swagger)
    return fastify.log.warn('@fastify/swagger already registered');
  
  fastify.register(FastifySwagger, {
    swagger: {
      info: {
        title: 'Cinévoraces API',
        description: 'API Documentation',
        version: '3',
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json', 'multipart/form-data'],
      produces: ['application/json'],
      tags: [
        { name: 'Admin', description: 'Admin API' },
        { name: 'Authentication', description: 'Authentication API' },
        { name: 'Public', description: 'Public files API' },
        { name: 'Episodes', description: 'Episodes API' },
        { name: 'Metrics', description: 'Metrics API' },
        { name: 'Movies', description: 'Movies API' },
        { name: 'Reviews', description: 'Reviews API' },
        { name: 'Seasons', description: 'Seasons API' },
        { name: 'Users', description: 'Users API' },
      ],
    },
  });

  fastify.register(FastifySwaggerUi, {
    routePrefix: '/swagger',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
      tryItOutEnabled: false,
    },
  });
  
  done();
}) as FastifyPluginCallback);
