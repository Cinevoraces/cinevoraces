import type { FastifySchema } from 'fastify';

export const getMoviesSchema: FastifySchema = {
  description: `
  **Get all movies**.
  Use query parameters to filter the results using the following format: */movies?filter[is_published]=true&filter[season_id]=3*
  Available query parameters:
  - filter[is_published]: filter by published status
  - filter[season_id]: filter by season number
  - Filter[user_id]: filter by user id
  `,
  tags: ['Movies'],
  querystring: {
    type: 'object',
    properties: {
      filter: {
        type: 'object',
        properties: {
          is_published: { type: 'boolean' },
          pagination: { type: 'number' },
          orderBy: { type: 'string' }
        },
      },

    },
  },
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'movie#' },
    },
  },
};

export const getMovieSchema: FastifySchema = {
  description: '**Get one movie by id**.',
  tags: ['Movies'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      $ref: 'movie#',
    },
    '404': { $ref: 'apiError#' },
  },
};
