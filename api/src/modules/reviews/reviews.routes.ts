import type { FastifyInstance } from 'fastify';
import {
  handleReviewMovie,
} from '@modules/reviews/reviews.handler';
import { reviewMovieSchema } from '@modules/reviews/reviews.schema';

export const reviews = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'PUT',
    url: '/reviews/:movieId',
    schema: reviewMovieSchema,
    handler: handleReviewMovie,
    onRequest: [fastify.accessVerify],
    preHandler: [fastify.findOrCreateReviewObject],
  });
};
