import { AuthService } from '@src/services';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import ReviewService from '../../services/ReviewService';
import schemas from './schemas';
import type { PUTReviewsBody } from './types';

export default plugin(async fastify => {
    const authService = new AuthService(fastify.postgres);
    const reviewService = new ReviewService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'PUT',
        url: '/reviews/:movieId',
        schema: fastify.getSchema('API:PUT/reviews/:movieId'),
        handler: async (request: Request<PUTReviewsBody>, reply: Reply) => {
            await authService.verifyAccessToken(request);
            const { body, params, user } = request;
            const currentReview = await reviewService.getOrCreateMovieReview(user.id, params.movieId);
            const review = await reviewService.updateReview(user.id, params.movieId, body);
            const message = reviewService.buildCreateReviewResponse(body, currentReview);
            reply.code(201).send({ message, review });
        },
    });
});
