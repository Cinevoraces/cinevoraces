import type { FastifyInstance } from 'fastify';
import {
  handleReviewMovie,
  handleGetReviews,
  handleDeleteReview
} from '@modules/reviews/reviews.handler';
import { 
  reviewMovieSchema,
  getReviewsSchema,
  deleteReviewSchema
} from '@modules/reviews/reviews.schema';

export const reviews = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'PUT',
    url: '/reviews/:movieId',
    schema: reviewMovieSchema,
    handler: handleReviewMovie,
    onRequest: [fastify.accessVerify],
    preHandler: [fastify.findOrCreateReviewObject],
  });

  fastify.route({
    method: 'GET',
    url: '/reviews',
    schema: getReviewsSchema,
    handler: handleGetReviews,
    onRequest: [fastify.isAdmin],
  });

  fastify.route({
    method: 'DELETE',
    url: '/reviews/:movieId/:userId',
    schema: deleteReviewSchema,
    handler: handleDeleteReview,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.passwordVerify],
  });
};