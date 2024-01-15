import { type FastifyPluginCallback, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';

export default plugin((async (fastify, opts, done) => {
    /**
     * @preHandler
     * @description Creates an empty review object if it doesn't exist.
     */
    fastify.decorate(
        'findOrCreateReview',
        async (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            request: Request<{ Params: { movieId: number } }>,
            reply: Reply,
        ) => {
            const { _reviewService } = fastify;
            const { params, user } = request;
            const review = await _reviewService.getOrCreateMovieReview(user.id, params.movieId);
            request.user = {
                ...user,
                previous_review: { ...review },
            };
        },
    );

    done();
}) as FastifyPluginCallback);
