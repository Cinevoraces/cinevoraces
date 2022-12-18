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

export const createSeasonSchema: FastifySchema = {
  description: `
  **Create new season and all associated episodes (proposition slots).**
  `,
  tags: ['Admin'],
  body: {
    type: 'object',
    properties: {
      year: { type: 'number', minimum: 1, maximum: 3000 },
      season_number: { type: 'number', minimum: 1, maximum: 99 },
    },
  },
  response: {
    '201': {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
