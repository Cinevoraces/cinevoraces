import type { FastifyInstance } from 'fastify';
import { 
  getEpisodesSchema, 
  adminUnbookEpisodeSchema,
} from './episodes.schema';
import { 
  handleGetEpisodes, 
  handleAdminUnbookEpisode,
} from './episodes.handler';

export const episodes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/episodes',
    schema: getEpisodesSchema,
    handler: handleGetEpisodes,
    onRequest: [fastify.verifyAccessToken],
  });

  fastify.route({
    method: 'PUT',
    url: '/admin/episodes/unbook/:id',
    schema: adminUnbookEpisodeSchema,
    handler: handleAdminUnbookEpisode,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword, fastify.isEpisodeBooked],
  });
};
