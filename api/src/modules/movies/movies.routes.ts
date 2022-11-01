import type { FastifyInstance } from 'fastify';
import {
  handleGetMovies,
  handleProposeMovie,
} from '@modules/movies/movies.handler';
import { 
  getMoviesSchema, 
  proposeMovieSchema
} from '@modules/movies/movies.schema';

export const movies = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/movies',
    schema: getMoviesSchema,
    handler: handleGetMovies,
    onRequest: [fastify.isLogged],
  });

  fastify.route({
    method: 'POST',
    url: '/movies',
    schema: proposeMovieSchema,
    handler: handleProposeMovie,
    onRequest: [fastify.isLogged],
    preValidation: [fastify.doesMovieExist],
  });
};
