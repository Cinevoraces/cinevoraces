import type { FastifyInstance } from 'fastify';
import { handleGetAllSeasons } from '@modules/seasons/seasons.handler';
import { getAllSeasonsSchema } from '@modules/seasons/seasons.schema';

export const seasons = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/seasons',
    schema: getAllSeasonsSchema,
    handler: handleGetAllSeasons,
  });
};
