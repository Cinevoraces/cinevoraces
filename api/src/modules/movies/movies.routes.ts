import type { FastifyInstance } from 'fastify';
import {
  handleGetMovies,
} from '@modules/movies/movies.handler';
import { getMoviesSchema } from '@modules/movies/movies.schema';

export const movies = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/movies',
    schema: getMoviesSchema,
    handler: handleGetMovies,
  });
};
