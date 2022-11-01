import type { FastifySchema } from 'fastify';

export const getMoviesSchema: FastifySchema = {
  description: `
  **Get movies**.
  Use query parameters to filter the results using the following format: */movies?where[is_published]=true&select[metrics]=true&limit=5&sort[desc]=id*.
  To access users related filters, the accessToken is needed. Using thoses will return only movies where the user has an **review object**.  
  **Available filters:**
  - where[id] -> number
  - where[author_id] -> number
  - where[season_number] -> number
  - where[is_published] -> boolean

  **Available populators**
  - select[author] -> boolean
  - select[casting] -> boolean
  - select[directors] -> boolean
  - select[runtime] -> boolean
  - select[release_date] -> boolean
  - select[genres] -> boolean
  - select[countries] -> boolean
  - select[languages] -> boolean
  - select[presentation] -> boolean
  - select[metrics] -> boolean
  - select[comments] -> boolean

  **logged user only:**
  - where[bookmarked] -> boolean
  - where[viewed] -> boolean
  - where[liked] -> boolean
  - where[rating] -> boolean
  
  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by id)*
  `,
  tags: ['Movies'],
  querystring: {
    type: 'object',
    properties: {
      where: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          author_id: { type: 'number' },
          season_number: { type: 'number' },
          is_published: { type: 'boolean' },
          bookmarked: { type: 'boolean' },
          viewed: { type: 'boolean' },
          liked: { type: 'boolean' },
          rating: { type: 'boolean' },
        },
      },
      select: {
        type: 'object',
        properties: {
          author: { type: 'boolean' },
          casting: { type: 'boolean' },
          directors: { type: 'boolean' },
          runtime: { type: 'boolean' },
          release_date: { type: 'boolean' },
          genres: { type: 'boolean' },
          countries: { type: 'boolean' },
          languages: { type: 'boolean' },
          presentation: { type: 'boolean' },
          metrics: { type: 'boolean' },
          comments: { type: 'boolean' },
        },
      },
      limit: { type: 'number' },
      sort: { type: 'string' },
    },
  },
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'movie#' },
    },
    '404': { $ref: 'apiError#' },
  },
};
