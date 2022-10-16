import type { FastifyInstance } from 'fastify';
import {
  handleGetMovieById,
  handleGetMovies,
} from '@modules/movies/movies.handler';
import { getMovieSchema, getMoviesSchema } from '@modules/movies/movies.schema';

export const movies = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/movies',
    schema: getMoviesSchema,
    handler: handleGetMovies,
  });

  fastify.route({
    method: 'GET',
    url: '/movies/:id',
    schema: getMovieSchema,
    handler: handleGetMovieById,
  });
};
