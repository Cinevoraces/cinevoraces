import { movie } from '@routes/movie.route';
import prismaClient from '@plugins/prismaClient';

const app = async (fastify: FastifyInstance) => {

  // Register plugins
  fastify.register(prismaClient);
  
  // Register routes
  fastify.register(movie);
}

export default app;