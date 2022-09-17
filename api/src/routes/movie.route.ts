import { getMovies } from "@src/controllers/movie.controllers";

export const movie = async (fastify: FastifyInstance) => {

  const movieGetOpts = {
    schema: {},
    handler: getMovies
  }

  fastify.get('/', movieGetOpts);
}