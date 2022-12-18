import type { FastifyInstance } from 'fastify';
import { plugins } from './plugins/_index';
import { schemas } from './schemas/_index';
import { routes } from './modules/_index';
import { hooks } from './hooks/_index';

const app = async (fastify: FastifyInstance) => {
  plugins.forEach((plugin) => fastify.register(plugin));
  hooks.forEach((hook) => fastify.register(hook));
  schemas.forEach((schema) => fastify.addSchema(schema));
  routes.forEach((route) => fastify.register(route));
};

export default app;
