import { getMovies } from "@src/controllers/movie.controllers";

export const movie = async (fastify: FastifyInstance) => {

  const movieGetOpts = {
    schema: {
      querystring: {
        type: "object",
        properties: {
          filter: {
            type: 'object'
          }
        }
      }
    },
    handler: getMovies
  }

  fastify.get('/movies', movieGetOpts);
}