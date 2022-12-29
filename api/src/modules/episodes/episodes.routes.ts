import type { FastifyInstance } from 'fastify';
import { getEpisodesSchema } from './episodes.schema';
import { handleGetAvailableEpisodes } from './episodes.handler';

export const episodes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/episodes',
    schema: getEpisodesSchema,
    handler: handleGetAvailableEpisodes,
    onRequest: [fastify.verifyAccessToken],
  });
};
