import {
    EAddReview,
    EErrorMessages,
    EResponseMessages,
    EReview,
    ESchemasIds,
    EUpdateReview,
    type Review,
} from '@src/types';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

/**
 * @description Reviews API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {
    /**
     * @description Create or update one movie review.
     * @route PUT /reviews/:movieId
     */
    fastify.route({
        method: 'PUT',
        url: '/reviews/:movieId',
        schema: fastify.getSchema(ESchemasIds.PUTReviews),
        onRequest: [fastify.verifyAccessToken],
        preHandler: [fastify.findOrCreateReview],
        handler: async function (
            request: Request<{
                Params: { movieId: number; userId: number };
                Body: Record<
                    keyof Pick<Review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>,
                    boolean | number | string
                >;
            }>,
            reply: Reply,
        ) {
            const { _reviewService } = this;
            const { body, params, user } = request;
            const { id: userId, previous_review } = user;

            await _reviewService.updateReview(userId, params.movieId, body);
            const { rows: review } = await _reviewService.getOneReviewByIds(userId, params.movieId);

            const response = {
                message: (() => {
                    const key = Object.keys(body)[0] as EReview;
                    switch (key) {
                        case EReview.COMMENT:
                            if (previous_review.comment) return EUpdateReview.COMMENT;
                            else return EAddReview.COMMENT;
                        case EReview.RATING:
                            if (previous_review.rating) return EUpdateReview.RATING;
                            else return EAddReview.RATING;
                        default:
                            if (body[key]) return EAddReview[key.toUpperCase() as keyof typeof EAddReview];
                            else return EUpdateReview[key.toUpperCase() as keyof typeof EUpdateReview];
                    }
                })(),
                review: review[0],
            };

            reply.code(201).send(response);
        },
    });

    /**
     * @description Get all reviews as admin.
     * @route GET /admin/reviews
     */
    fastify.route({
        method: 'GET',
        url: '/admin/reviews',
        schema: fastify.getSchema(ESchemasIds.GETReviewsAsAdmin),
        onRequest: [fastify.isAdmin],
        handler: async function (request: Request, reply: Reply) {
            const { _errorService, _reviewService } = this;
            const { rows: reviews, rowCount } = await _reviewService.getReviewsAsAdmind(request.query);
            if (!rowCount) _errorService.send(EErrorMessages.NOT_FOUND, 404);
            reply.code(200).send(reviews);
        },
    });

    /**
     * @description Delete a comment on a review as admin.
     * @route DELETE /admin/reviews/:movieId/:userId
     */
    fastify.route({
        method: 'DELETE',
        url: '/admin/reviews/:movieId/:userId',
        schema: fastify.getSchema(ESchemasIds.DELETEMoviesAsAdmin),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword],
        handler: async function (request: Request<{ Params: { movieId: number; userId: number } }>, reply: Reply) {
            const { _reviewService } = this;
            const { movieId, userId } = request.params;
            await _reviewService.deleteCommentAsAdmin(movieId, userId);
            reply.code(201).send({ message: EResponseMessages.DELETE_COMMENT_SUCCESS });
        },
    });
};
