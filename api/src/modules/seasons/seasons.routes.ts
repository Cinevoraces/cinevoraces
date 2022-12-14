import type { FastifyInstance } from 'fastify';
import {
  handleGetAllSeasons,
  handleCreateNewSeason,
} from './seasons.handler';
import {
  getAllSeasonsSchema,
  createSeasonSchema,
} from './seasons.schema';

export const seasons = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/seasons',
    schema: getAllSeasonsSchema,
    handler: handleGetAllSeasons,
  });

  fastify.route({
    method: 'POST',
    url: '/admin/seasons',
    schema: createSeasonSchema,
    handler: handleCreateNewSeason,
    onRequest: [fastify.isAdmin],
  });
};
