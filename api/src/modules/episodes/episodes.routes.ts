import type { FastifyInstance } from 'fastify';
import { 
  getEpisodesSchema, 
  bookEpisodeSchema,
  adminUnbookEpisodeSchema,
} from './episodes.schema';
import { 
  handleGetEpisodes, 
  handleBookEpisode,
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
    url: '/episodes/book/:id',
    schema: bookEpisodeSchema,
    handler: handleBookEpisode,
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.hasProposition, fastify.isEpisodeBooked],
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
