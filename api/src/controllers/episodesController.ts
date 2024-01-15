import { EErrorMessages, ESchemasIds } from '@src/types';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

/**
 * @description Episode API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {
    /**
     * @description Get next 5 episodes available within a month.
     * @route GET /episodes
     */
    fastify.route({
        method: 'GET',
        url: '/episodes',
        schema: fastify.getSchema(ESchemasIds.GETEpisodes),
        onRequest: [fastify.verifyAccessToken],
        handler: async function (request: Request, reply: Reply) {
            const { _errorService, _movieService } = this;
            const episodes = await _movieService.getAvailableEpisodes();

            if (!episodes.rowCount) _errorService.send(EErrorMessages.NO_EPISODE_AVAILABLE, 404);

            reply.code(200).send(episodes.rows);
        },
    });
};
