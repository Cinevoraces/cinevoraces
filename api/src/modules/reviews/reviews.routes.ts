import type { FastifyInstance } from 'fastify';
import {
  handleReviewMovie,
  handleAdminGetReviews,
  handleAdminDeleteReview
} from '@modules/reviews/reviews.handler';
import { 
  reviewMovieSchema,
  adminGetReviewsSchema,
  adminDeleteReviewSchema
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
    url: '/admin/reviews',
    schema: adminGetReviewsSchema,
    handler: handleAdminGetReviews,
    onRequest: [fastify.isAdmin],
  });

  fastify.route({
    method: 'DELETE',
    url: '/admin/reviews/:movieId/:userId',
    schema: adminDeleteReviewSchema,
    handler: handleAdminDeleteReview,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.passwordVerify],
  });
};
