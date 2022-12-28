import type { FastifySchema } from 'fastify';

export const getEpisodesSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `**Get episodes**.
  Use query parameters to filter the results using the following format: */episodes?where[is_booked]=true*  
  **Available filters:**
  - where[id] -> number
  - where[is_booked] -> boolean
  - where[season_number] -> number
  - where[episode_number] -> number

  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by id)*
  `,
  tags: ['Episodes'],
  querystring: {
    type: 'object',
    properties: {
      where: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          is_booked: { type: 'boolean' },
          season_number: { type: 'number' },
          episode_number: { type: 'number' },
        },
      },
      limit: { type: 'number' },
      sort: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: { $ref: 'episode#' },
    },
  },
};

export const adminUnbookEpisodeSchema: FastifySchema = {
  description: `**Unbook an episode by id**.
  Route protected by *admin* role.
  You must provide the password as well.
  `,
  tags: ['Admin'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: { type: 'string' },
    },
  },
  response: {
    204: { 
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};
