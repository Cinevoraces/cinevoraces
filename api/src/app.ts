import { movie } from '@routes/movie.route';
import prismaClient from '@plugins/prismaClient';
import jwt from '@plugins/jwt';

const app = async (fastify: FastifyInstance) => {

  // Register plugins
  fastify.register(prismaClient);
  fastify.register(jwt);
  
  // Register routes
  fastify.register(movie);
}

export default app;