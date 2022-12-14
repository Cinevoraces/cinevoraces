import type { FastifySchema } from 'fastify';

export const getMoviesSchema: FastifySchema = {
  description: `
  **Get movies**.
  Use query parameters to filter the results using the following format: */movies?where[is_published]=true&select[metrics]=true&limit=5&sort=desc*.
  To access users related filters, the accessToken is needed. Using thoses will return only movies where the user has an **review object**.  
  **Available filters:**
  - where[id] -> number
  - where[author_id] -> number
  - where[season_number] -> number
  - where[is_published] -> boolean

  **Available populators**
  - select[casting] -> boolean
  - select[directors] -> boolean
  - select[runtime] -> boolean
  - select[episode_number] -> boolean
  - select[release_date] -> boolean
  - select[genres] -> boolean
  - select[countries] -> boolean
  - select[languages] -> boolean
  - select[presentation] -> boolean
  - select[metrics] -> boolean
  - select[comments] -> boolean
  
  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by publishing_date)*
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
          rating: { type: 'number' || 'null' },
        },
      },
      select: {
        type: 'object',
        properties: {
          casting: { type: 'boolean' },
          directors: { type: 'boolean' },
          runtime: { type: 'boolean' },
          episode_number: { type: 'boolean' },
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
    200: {
      type: 'array',
      items: { $ref: 'movie#' },
    },
  },
};

export const proposeMovieSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `
  **Propose movie**.
  `,
  tags: ['Movies'],
  body: {
    type: 'object',
    properties: {
      french_title: { type: 'string' },
      original_title: { type: 'string' },
      poster_url: { type: 'string' },
      directors: { type: 'array', items: { type: 'string' } },
      release_date: { type: 'string' },
      runtime: { type: 'number' },
      casting: { type: 'array', items: { type: 'string' } },
      presentation: { type: 'string' },
      movie_genres: { type: 'array', items: { type: 'string' } },
      movie_languages: { type: 'array', items: { type: 'string' } },
      movie_countries: { type: 'array', items: { type: 'string' } },
      episode_id: { type: 'number' },
    },
    required: [
      'french_title',
      'original_title',
      'poster_url',
      'directors',
      'release_date',
      'runtime',
      'casting',
      'presentation',
      'movie_genres',
      'movie_languages',
      'movie_countries',
      'episode_id',
    ],
  },
  response: {
    201: { 
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

export const updateProposedMovieSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `
  **Propose movie**.
  `,
  tags: ['Movies'],
  body: {
    type: 'object',
    properties: {
      movie_id: { type: 'number' },
      presentation: { type: 'string' },
    },
    required: ['movie_id', 'presentation'],
  },
  response: {
    201: { 
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

export const adminPublishMovieSchema: FastifySchema = {
  description: `
  **Publish movie**.
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
    properties: {
      password: { type: 'string' },
    },
    required: ['password'],
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

export const adminDeleteMovieSchema: FastifySchema = {
  description: `
  **Delete movie**.
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
    properties: {
      password: { type: 'string' },
    },
    required: ['password'],
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
