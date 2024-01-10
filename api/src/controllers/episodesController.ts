import type { FastifyInstance, FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { ESchemasIds, EErrorMessages } from '../models/enums/_index';

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
