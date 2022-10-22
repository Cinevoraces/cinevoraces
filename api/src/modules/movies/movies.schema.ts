import type { FastifySchema } from 'fastify';

export const getMoviesSchema: FastifySchema = {
  description: `
  **Get all movies**.
  Use query parameters to filter the results using the following format: */movies?filter[is_published]=true&filter[season_id]=3&limit=5&desc=id*.
  To access users related filters, the accessToken is needed. Using thoses will return only movies where the user has an **review object**.  
  **Available query parameters:**
  - filter[is_published]: filter by published status.
  - filter[season_id]: filter by season number.
  - filter[user_id]: filter by user id.  

  **Available query parameters *logged user only*:**
  - filter[bookmarked]: filter by bookmarked status.
  - filter[viewed]: filter by viewed status.
  - filter[liked]: filter by liked status.
  - filter[rating]: filter by rating value *(<=)*.
  
  **Available query options**
  - limit: limit the number of results.
  - asc: sort by ascending order using column name.
  - desc: sort by descending order using column name.
  `,
  tags: ['Movies'],
  querystring: {
    type: 'object',
    properties: {
      filter: {
        type: 'object',
        properties: {
          is_published: { type: 'boolean' },
          season_id: { type: 'number' },
          user_id: { type: 'number' },
          bookmarked: { type: 'boolean' },
          viewed: { type: 'boolean' },
          liked: { type: 'boolean' },
          rating: { type: 'number' },
        },
      },
      limit: { type: 'number' },
      asc: { type: 'string' },
      desc: { type: 'string' },
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
