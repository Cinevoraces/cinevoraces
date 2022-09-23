import prismaClient from '@plugins/prismaClient';
import { movies } from '@modules/movies/movies.routes';
import schemasRegister from './schemas';
import { FastifyInstance } from 'fastify';

const app = async (fastify: FastifyInstance) => {
  fastify.register(schemasRegister)
  // Register plugins
  fastify.register(prismaClient);
  // Register routes
  fastify.register(movies);
}

export default app;