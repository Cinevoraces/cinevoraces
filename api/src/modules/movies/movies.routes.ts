import type { FastifyInstance } from 'fastify';
import {
  handleGetMovies,
  handleProposeMovie,
  handleUpdateProposedMovie,
  handleAdminPublishMovie,
  handleAdminDeleteMovie,
} from '@modules/movies/movies.handler';
import { 
  getMoviesSchema, 
  proposeMovieSchema,
  updateProposedMovieSchema,
  adminPublishMovieSchema,
  adminDeleteMovieSchema,
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
    onRequest: [fastify.accessVerify],
    preHandler: [fastify.sanitizePayload],
    preValidation: [fastify.hasMovieBeenProposed],
  });

  fastify.route({
    method: 'PUT',
    url: '/movies',
    schema: updateProposedMovieSchema,
    handler: handleUpdateProposedMovie,
    onRequest: [fastify.accessVerify],
    preHandler: [fastify.sanitizePayload],
    preValidation: [fastify.isMoviePublishedAsUser],
  });

  fastify.route({
    method: 'PUT',
    url: '/admin/movies/publish/:id',
    schema: adminPublishMovieSchema,
    handler: handleAdminPublishMovie,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.isMoviePublishedAsAdmin],
  });

  fastify.route({
    method: 'DELETE',
    url: '/admin/movies/:id',
    schema: adminDeleteMovieSchema,
    handler: handleAdminDeleteMovie,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.doesMovieExist],
  });
};
