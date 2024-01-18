import { ESchemasIds } from '@src/types';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

export default async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'GET',
        url: '/episodes',
        schema: fastify.getSchema(ESchemasIds.GETEpisodes),
        onRequest: [fastify.verifyAccessToken],
        handler: async (request: Request, reply: Reply) => {
            const { episodeService } = fastify.services;
            const episodes = await episodeService.getAvailableEpisodes();
            reply.code(200).send(episodes.rows);
        },
    });
};
