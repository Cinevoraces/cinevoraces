import dbconnector from '@plugins/dbconnector';
import movie from '@routes/movie.route';

export default async function app(fastify: serverInstance) {

  // Register plugins
  fastify.register(dbconnector);

  // Register routes
  fastify.register(movie);
}