import type { FastifySchema } from 'fastify';

export const reviewMovieSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `
  **Update one review by user and movie id**.
  Movie's *id* must be set in *params* and access token in bearer to pass user id.
  `,
  tags: ['Reviews'],
  params: {
    type: 'object',
    properties: {
      movieId: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    maxProperties: 1,
    minProperties: 1,
    properties: {
      bookmarked: { type: 'boolean' },
      viewed: { type: 'boolean' },
      liked: { type: 'boolean' },
      rating: { type: 'number' },
      comment: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        review: {
          type: 'object',
          properties: {
            bookmarked: { type: 'boolean' },
            viewed: { type: 'boolean' },
            liked: { type: 'boolean' },
            rating: { type: 'number' },
            comment: { type: 'string' }
          },
        },
      },
      required: ['message', 'review'],
    },
  },
};

export const adminGetReviewsSchema: FastifySchema = {
  description: `
  **Get reviews**.
  Use query parameters to filter the results using the following format: */reviews?select[user_id]=2&select[movie_id]=3*
  **Available filters:**
  - where[movie_id] -> number
  - where[author_id] -> number
  
  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by id)*
  `,
  tags: ['Admin'],
  querystring: {
    type: 'object',
    properties: {
      where: {
        type: 'object',
        properties: {
          movie_id: { type: 'number' },
          author_id: { type: 'number' },
        },
      },
      limit: { type: 'number' },
      sort: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: { $ref: 'review#' },
    },
  },
};

export const adminDeleteReviewSchema: FastifySchema = {
  description: `
  **Delete one review by user and movie id**.
  `,
  tags: ['Admin'],
  params: {
    type: 'object',
    properties: {
      movieId: { type: 'number' },
      userId: { type: 'number' },
    },
    required: ['movieId', 'userId'],
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
