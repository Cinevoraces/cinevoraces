import type { FastifySchema } from 'fastify';

export const getEpisodesSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: '**Get episodes**.',
  tags: ['Episodes'],
  response: {
    200: {
      type: 'array',
      items: { $ref: 'episode#' },
    },
  },
};
