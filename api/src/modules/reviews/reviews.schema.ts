import type { FastifySchema } from 'fastify';

export const reviewMovieSchema: FastifySchema = {
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
    '200': {
      message: { type: 'string' },
      review: { $ref: 'review#' }
    },
    '404': { $ref: 'apiError#' },
  },
};

export const getAllReviewsSchema: FastifySchema = {
  description: `
  **Get all reviews**.
  Use query parameters to filter the results using the following format: */reviews?filter[user_id]=2&filter[movie_id]=3*
  Available query parameters:
  - filter[movie_id]: filter by movie id
  - filter[user_id]: filter by user id
  `,
  tags: ['Reviews'],
  querystring: {
    type: 'object',
    properties: {
      filter: {
        type: 'object',
      },
    },
  },
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'review#' },
    },
    '401': { $ref: 'apiError#' },
    '403': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
  },
};

export const deleteReviewSchema: FastifySchema = {
  summary: 'Admin only',
  description: `
  **Delete one review by user and movie id**.
  `,
  tags: ['Reviews'],
  params: {
    type: 'object',
    properties: {
      movieId: { type: 'number' },
      userId: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      message: { type: 'string' },
    },
    '401': { $ref: 'apiError#' },
    '403': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
  },
};
