import type { FastifyInstance } from 'fastify';
import {
  handleGetMovies,
  handleProposeMovie,
  handleUpdateProposedMovie,
  handleAdminPublishMovie,
  handleAdminDeleteMovie,
} from './movies.handler';
import { 
  getMoviesSchema, 
  proposeMovieSchema,
  updateProposedMovieSchema,
  adminPublishMovieSchema,
  adminDeleteMovieSchema,
} from './movies.schema';

export const movies = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/movies',
    schema: getMoviesSchema,
    handler: handleGetMovies,
    onRequest: [fastify.verifyAccessTokenOptionnal],
  });

  fastify.route({
    method: 'POST',
    url: '/movies',
    schema: proposeMovieSchema,
    handler: handleProposeMovie,
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.doesPropositionExist],
  });

  fastify.route({
    method: 'PUT',
    url: '/movies',
    schema: updateProposedMovieSchema,
    handler: handleUpdateProposedMovie,
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.isMoviePublished],
  });

  fastify.route({
    method: 'PUT',
    url: '/admin/movies/publish/:id',
    schema: adminPublishMovieSchema,
    handler: handleAdminPublishMovie,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword, fastify.isMoviePublished],
  });

  fastify.route({
    method: 'DELETE',
    url: '/admin/movies/:id',
    schema: adminDeleteMovieSchema,
    handler: handleAdminDeleteMovie,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword, fastify.doesMovieExist],

  });
};
