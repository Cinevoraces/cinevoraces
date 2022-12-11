import type { FastifySchema } from 'fastify';

export const getAllSeasonsSchema: FastifySchema = {
  description: `
  **Get seasons objects**
  `,
  tags: ['Seasons'],
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'season#' },
    },
    '404': { $ref: 'apiError#' },
  },
};
